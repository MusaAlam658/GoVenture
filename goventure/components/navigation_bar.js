import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function NavigationBar({ setActiveScreen }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('HomeScreen')}>
        <Image source={require('../assets/home_icon.png')} style={styles.icon} />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('BookingScreen')}>
        <Image source={require('../assets/airplane_icon.png')} style={styles.planeicon} />
        <Text style={styles.navText}>Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('ReviewPage')}>
        <Image source={require('../assets/review_icon.png')} style={styles.icon} />
        <Text style={styles.navText}>Reviews</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#002B5C',
    padding: 5,
    borderColor: '#fff',
    height: height * 0.1, 
    marginBottom: '0.01%'
  },
  icon: {
    width: 17,
    height: 19,
    alignSelf: 'center',
  },
  planeicon: {
     width: 25,
    height: 19,
    alignSelf: 'center',
  },
  navButton: {
    padding: 5,
  },
  navText: {
    fontSize: 16,
    color: '#fff'
  },
});
