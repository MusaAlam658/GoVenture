import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  reviews,
  setReviews,
  selectedFlight,
}) => {
  const regex = /^[A-Za-z\s]*$/;

  const handleInputChange = (field, text) => {
    if (regex.test(text)) {
      setReviews({ ...reviews, [field]: text });
    } else {
      alert('Only letters and spaces are allowed.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Write a Review</Text>

          <Text style={styles.question}>Q1. How would you rate your overall travel experience?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer"
            value={reviews.travelExperience}
            onChangeText={(text) => handleInputChange('travelExperience', text)}
          />

          <Text style={styles.question}>Q2. How would you rate the quality of the flight?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer"
            value={reviews.flightQuality}
            onChangeText={(text) => handleInputChange('flightQuality', text)}
          />

          <Text style={styles.question}>Q3. How would you rate the airline's service?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer"
            value={reviews.airlineService}
            onChangeText={(text) => handleInputChange('airlineService', text)}
          />

          <Text style={styles.question}>Q4. What was the highlight of your trip?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your answer"
            value={reviews.tripHighlight}
            onChangeText={(text) => handleInputChange('tripHighlight', text)}
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.modalbutton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalbutton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  question: {
    marginTop: 10,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalbutton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
