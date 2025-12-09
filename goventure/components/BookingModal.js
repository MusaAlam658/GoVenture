import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const BookingModal = ({
  visible,
  step,
  adults,
  children,
  selectedSeats,
  setStep,
  setAdults,
  setChildren,
  setSelectedSeats,
  setUseSavedCard,
  setShowBookingModal,
  bookFlight,
  setActiveScreen,
  flight
}) => {
  if (!visible) return null;

  // Calculate the total number of seats to be selected based on adults + children
  const totalSeatsToSelect = parseInt(adults || '0', 10) + parseInt(children || '0', 10);

  // Create the seat numbers (18 seats in total)
  const seatNumbers = Array.from({ length: 18 }, (_, index) => index + 1);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
                {step === 1 && (
          <>
            <Text style={styles.modalTitle}>How many tickets?</Text>
            <TextInput
              style={styles.input}
              placeholder="Adults"
              keyboardType="number-pad"
              value={adults}
              onChangeText={(val) => {
                const numeric = val.replace(/[^0-9]/g, '');
                setAdults(numeric);
              }}
              maxLength={1} // Limit input length
            />
            <TextInput
              style={styles.input}
              placeholder="Children"
              keyboardType="number-pad"
              value={children}
              onChangeText={(val) => {
                const numeric = val.replace(/[^0-9]/g, '');
                setChildren(numeric);
              }}
              maxLength={1} // Limit input length
            />
            {(parseInt(adults || '0') + parseInt(children || '0')) > 5 && (
              <Text style={styles.errorText}>You can book a maximum of 5 tickets.</Text>
            )}
            <TouchableOpacity
              style={[
                styles.nextButton,
                (parseInt(adults || '0') + parseInt(children || '0')) > 5 && { backgroundColor: '#ccc' }
              ]}
              disabled={(parseInt(adults || '0') + parseInt(children || '0')) > 5}
              onPress={() => setStep(2)}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.modalTitle}>Select your seats</Text>
            <View style={styles.seatsContainer}>
              {seatNumbers.map((seat, index) => {
                // Group seats into 6 columns, each group having 3 seats
                const isSeatSelected = selectedSeats.includes(seat);

                return (
                  <View
                    key={seat}
                    style={[
                      styles.seatGroup,
                      index % 3 === 0 && { marginLeft: 0 }, // Adjust left margin for each group of 3 seats
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.seat,
                        isSeatSelected && styles.selectedSeat
                      ]}
                      onPress={() => {
                        if (selectedSeats.includes(seat)) {
                          setSelectedSeats(selectedSeats.filter((s) => s !== seat));
                        } else {
                          if (selectedSeats.length < totalSeatsToSelect) {
                            setSelectedSeats([...selectedSeats, seat]);
                          }
                        }
                      }}
                      disabled={selectedSeats.length >= totalSeatsToSelect && !isSeatSelected}
                    >
                      <Text style={styles.seatText}>{seat}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => setStep(3)}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.modalTitle}>Use saved card details?</Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setUseSavedCard(true);
                setShowBookingModal(false);
                setStep(1);
                bookFlight(flight.id);
                setActiveScreen('BookingScreen');
              }}
            >
              <Text style={styles.nextButtonText}>Yes</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#002B5C',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  seatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seatGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedSeat: {
    backgroundColor: '#FEA473',
  },
  seatText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BookingModal;
