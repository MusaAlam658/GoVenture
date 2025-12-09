import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useFlightContext } from './FlightContext';
import TopNavbar from './top_navbar';
import ReviewModal from './ReviewModal';
import openai from './OpenAI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingScreen({ navigation }) {
  const { bookedFlights, addReview } = useFlightContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [reviews, setReviews] = useState({
    travelExperience: '',
    flightQuality: '',
    airlineService: '',
    tripHighlight: '',
  });

  const [loadingItineraryId, setLoadingItineraryId] = useState(null);
  const [itineraries, setItineraries] = useState({});
  const [itineraryUsage, setItineraryUsage] = useState(0);  // Track AI Itinerary usage
  const [reviewUsage, setReviewUsage] = useState({}); // Track review usage per flight

  useEffect(() => {
    // Load saved itinerary usage and reviews from AsyncStorage
    const loadData = async () => {
      try {
        const savedReviews = await AsyncStorage.getItem('reviews');
        const savedItineraryUsage = await AsyncStorage.getItem('itineraryUsage');

        if (savedReviews) {
          setSubmittedReviews(JSON.parse(savedReviews));
        }
        if (savedItineraryUsage) {
          setItineraryUsage(Number(savedItineraryUsage));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Persist reviews and itinerary usage to AsyncStorage whenever they change
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('reviews', JSON.stringify(submittedReviews));
        await AsyncStorage.setItem('itineraryUsage', String(itineraryUsage));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [submittedReviews, itineraryUsage]);

  const openReviewModal = (flight) => {
    setSelectedFlight(flight);
    setModalVisible(true);
  };

  const submitReview = () => {
    if (selectedFlight && Object.values(reviews).every((review) => review.trim() !== '')) {
      addReview(selectedFlight.id, reviews);
      setSubmittedReviews((prev) => ({ ...prev, [selectedFlight.id]: true }));
      setModalVisible(false);
      setReviews({
        travelExperience: '',
        flightQuality: '',
        airlineService: '',
        tripHighlight: '',
      });
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const getDestinationTimeText = (destinationTime) => {
    if (destinationTime) {
      const formatted = new Date(destinationTime).toLocaleString();
      return `Destination Time: ${formatted}`;
    }
    return 'Destination Time: N/A';
  };

  const fetchItinerary = async (flight) => {
    if (itineraryUsage >= 2) {
      alert("You've reached the limit for itinerary requests today.");
      return;
    }

    setLoadingItineraryId(flight.id);
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You generate short, non-biased travel itineraries for travelers.',
          },
          {
            role: 'user',
            content: `Give me a short and specific itinerary of things I can do and places I can visit in ${flight.destinationCity}. Make sure you only mention the names of the places in bullet points like this: - Buckingham palace, - River Thames`,
          },
        ],
      });

      const responseText = response.choices[0].message.content.trim();
      setItineraries((prev) => ({ ...prev, [flight.id]: responseText }));
      setItineraryUsage(itineraryUsage + 1); // Increment itinerary usage
    } catch (error) {
      console.error('Failed to fetch itinerary:', error);
      setItineraries((prev) => ({
        ...prev,
        [flight.id]: 'Error fetching itinerary. Please try again later.',
      }));
    }
    setLoadingItineraryId(null);
  };

  return (
    <View style={styles.container}>
      <TopNavbar />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.heading}>Booked Flights</Text>

        {bookedFlights.length === 0 ? (
          <Text style={styles.noFlightsText}>You have no booked flights yet.</Text>
        ) : (
          bookedFlights.map((flight) => {
            const hasFlightEnded = new Date(flight.destinationTime) < new Date();
            const destinationTimeText = getDestinationTimeText(flight.destinationTime);

            return (
              <View key={flight.id} style={styles.flightCard}>
                <Text style={styles.flightName}>{flight.name}</Text>
                <Text style={styles.flightRoute}>
                  {flight.departureCity} → {flight.destinationCity}
                </Text>

                <Text style={styles.durationText}>🛫 {destinationTimeText}</Text>

                {hasFlightEnded && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.iconButton, submittedReviews[flight.id] && styles.buttonDisabled]}
                      onPress={() => openReviewModal(flight)}
                      disabled={submittedReviews[flight.id]}>
                      <Image source={require('../assets/pen_icon.png')} style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.newButton}
                      onPress={() => fetchItinerary(flight)}
                      disabled={itineraryUsage >= 2}>
                      <Text style={styles.newButtonText}>AI Itinerary</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Itinerary Section */}
                {loadingItineraryId === flight.id ? (
                  <ActivityIndicator style={{ marginTop: 10 }} size="small" color="green" />
                ) : itineraries[flight.id] ? (
                  <Text style={{ marginTop: 10, color: '#333' }}>{itineraries[flight.id]}</Text>
                ) : null}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Review Modal */}
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={submitReview}
        reviews={reviews}
        setReviews={setReviews}
        selectedFlight={selectedFlight}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  noFlightsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  flightName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flightRoute: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: '#555',
  },
  durationText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'navy',
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'green',
    backgroundColor: 'white',
  },
  newButtonText: {
    color: 'green',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

