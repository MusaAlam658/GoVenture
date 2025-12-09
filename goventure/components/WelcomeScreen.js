import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ setActiveScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen('LoginScreen');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [setActiveScreen]);

  return (
    <View style={styles.container}> 
      <Image
        source={require('../assets/welcome-screen-plane.png')}
        style={styles.planeImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText} numberOfLines={1} adjustsFontSizeToFit>
          Welcome To
        </Text>
        <Text style={[styles.welcomeText, styles.redText]}>GoVenture</Text>
        <Text style={styles.description}>
          {'\n\n'}Ready for a spontaneous adventure? Book and review flights that depart
          within the next 1 to 14 days. Your next great journey is just a click away!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  planeImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: height * 0.5,
    width: width * 0.75,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    position: 'absolute',
    bottom: height * 0.1, 
    left: 40,
    padding: 10,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000', 
    textAlign: 'left', 
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#000000', 
    textAlign: 'left', 
    lineHeight: 24, 
    maxWidth: width * 0.85, 
  },
});

export default WelcomeScreen;