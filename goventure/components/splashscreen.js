import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ setActiveScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen('WelcomeScreen');

    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [setActiveScreen]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/venture_logo.png')} style={styles.image} />
      <Text style={styles.text}>GoVenture</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEA473',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SplashScreen;
