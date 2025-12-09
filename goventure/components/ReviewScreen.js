import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFlightContext } from './FlightContext'; 
import TopNavbar from './top_navbar';


export default function ReviewPage() {
  const { bookedFlights } = useFlightContext(); // Access booked flights from context
  const [currentUser, setCurrentUser] = useState(null);


  return (
    <ScrollView style={styles.container}>
    <TopNavbar /> {/* Top Navbar component */}
      <Text style={styles.heading}>Flight Reviews</Text>
      {bookedFlights.map((flight) => (
        <View key={flight.id} style={styles.flightCard}>
          <Text style={styles.flightName}>{flight.name}</Text>
          <Text style={styles.reviewsTitle}>Reviews:</Text>
          {flight.reviews.length > 0 ? (
            flight.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>

                <Text style={styles.reviewLabel}>Travel Experience:</Text>
                <Text style={styles.reviewText}>{review.travelExperience}</Text>

                <Text style={styles.reviewLabel}>Flight Quality:</Text>
                <Text style={styles.reviewText}>{review.flightQuality}</Text>

                <Text style={styles.reviewLabel}>Airline Service:</Text>
                <Text style={styles.reviewText}>{review.airlineService}</Text>

                <Text style={styles.reviewLabel}>Trip Highlight:</Text>
                <Text style={styles.reviewText}>{review.tripHighlight}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReviewText}>No reviews yet for this flight.</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: '3%',
  },
  flightCard: {
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flightName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewCard: {
    marginBottom: 15,
  },
  reviewLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  noReviewText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
});

