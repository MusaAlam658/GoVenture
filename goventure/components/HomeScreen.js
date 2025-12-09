import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useFlightContext } from './FlightContext';
import { format, addDays, isSameDay } from 'date-fns';
import BookingModal from './BookingModal';


export default function HomeScreen({ setActiveScreen }) {
  const { availableFlights, bookFlight } = useFlightContext();
  const [filter, setFilter] = useState('All');
  const [expandedFlight, setExpandedFlight] = useState(null);
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 3));

const [selectedFlight, setSelectedFlight] = useState(null);


  const [showBookingModal, setShowBookingModal] = useState(false);
const [step, setStep] = useState(1);
const [adults, setAdults] = useState('');
const [children, setChildren] = useState('');
const [selectedSeats, setSelectedSeats] = useState([]);
const [useSavedCard, setUseSavedCard] = useState(false);


  const filteredFlights =
    filter === 'All'
      ? availableFlights
      : availableFlights.filter((flight) =>
          filter === 'Visa' ? flight.visa : !flight.visa
        );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Your Flight</Text>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarRow}>
          {weekDays.map((day, index) => (
            <View
              key={index}
              style={[
                styles.calendarDay,
                isSameDay(day, today) && styles.todayHighlight,
              ]}
            >
              <Text style={styles.calendarText}>{format(day, 'E')}</Text>
              <Text style={styles.calendarText}>{format(day, 'd')}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Visa' && styles.activeFilter]}
          onPress={() => setFilter('Visa')}
        >
          <Text style={styles.filterText}>Visa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'NoVisa' && styles.activeFilter]}
          onPress={() => setFilter('NoVisa')}
        >
          <Text style={styles.filterText}>No Visa</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Flight List */}
      <ScrollView style={styles.flightList}>
        {filteredFlights.length === 0 ? (
          <Text>No flights available for this filter.</Text>
        ) : (
          filteredFlights.map((flight) => (
            <TouchableOpacity
              key={flight.id}
              style={styles.flightCard}
              onPress={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
            >
              <View style={styles.flightHeader}>
                <Text style={styles.flightRoute}>
                  {flight.departureCity}  →  {flight.destinationCity}
                </Text>
                <TouchableOpacity onPress={() => bookFlight(flight.id)}>

                  <Image
                    source={require('../assets/airplane_icon.png')}
                    style={styles.planeIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.flightDetailsRow}>
                <View style={styles.flightDetailsColumn}>
                  <Text style={styles.flightLabel}>Flight Number</Text>
                  <Text style={styles.flightValue}>{flight.flightID}</Text>
                </View>
                <View style={styles.flightDetailsColumn}>
                  <Text style={styles.flightLabel}>Duration:</Text>
                  <Text style={styles.flightValue}>{flight.flightDuration}</Text>
                </View>
              </View>

              {expandedFlight === flight.id && (
              <View style={styles.expandedDetails}>

                <Text style={styles.flightLabel}>Airline:</Text>
                <Text style={styles.flightValue}>{flight.airlineName}</Text>

                <Text style={styles.flightLabel}>Seat Class:</Text>
                <Text style={styles.flightValue}>{flight.seatClass}</Text>

                <Text style={styles.flightLabel}>Departure Time:</Text>
                <Text style={styles.flightValue}>{flight.departureTime}</Text>

                <Text style={styles.flightLabel}>Terminal & Gate:</Text>
                <Text style={styles.flightValue}>{flight.terminalAndGateInfo}</Text>

                <Text style={styles.flightLabel}>Destination City:</Text>
                <Text style={styles.flightValue}>{flight.destinationCity}</Text>

                <Text style={styles.flightLabel}>Arrival Time:</Text>
                <Text style={styles.flightValue}>{flight.destinationTime}</Text>


                <Text style={styles.flightLabel}>Baggage Allowance:</Text>
                <Text style={styles.flightValue}>{flight.baggageAllowance}</Text>

                <Text style={styles.flightLabel}>In-flight Services:</Text>
                <Text style={styles.flightValue}>{flight.inFlightServices}</Text>



                
                 <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setSelectedFlight(flight);       // Save the current flight to pass into the modal
                      setShowBookingModal(true);       // Show the modal
                    }}
                  >
                    <Text style={styles.buttonText}>Book</Text>
                  </TouchableOpacity>



                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>


      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          visible={showBookingModal}
          step={step}
          adults={adults}
          children={children}
          selectedSeats={selectedSeats}
          setStep={setStep}
          setAdults={setAdults}
          setChildren={setChildren}
          setSelectedSeats={setSelectedSeats}
          setUseSavedCard={setUseSavedCard}
          setShowBookingModal={setShowBookingModal}
          bookFlight={bookFlight}
          setActiveScreen={setActiveScreen}
          flight={selectedFlight}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  calendarContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  calendarDay: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  todayHighlight: {
    backgroundColor: '#FEA473',
    borderRadius: 10,
    padding: 10,
  },
  calendarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderColor: '#000000',
    borderWidth: 1,
    width: '50%',
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderColor: '#DDDDDD',
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
  },
  filterText: {
    textAlign: 'center',
  },
  activeFilter: {
    backgroundColor: '#FEA473',
    color: 'white',
  },
  flightCard: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightRoute: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  flightDetailsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  flightLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  flightValue: {
    fontSize: 14,
    color: '#555',
  },
  expandedDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },
  planeIcon: {
    width: 30,
    height: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FEA473',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});