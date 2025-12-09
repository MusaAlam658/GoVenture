import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { FlightProvider } from './components/FlightContext';
import NavigationBar from './components/navigation_bar';
import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
import ReviewPage from './components/ReviewScreen';
import SplashScreen from './components/splashscreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Splash');
const [selectedFlight, setSelectedFlight] = useState(null);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Splash':
        return <SplashScreen setActiveScreen={setActiveScreen} />;
      case 'WelcomeScreen':
        return <WelcomeScreen setActiveScreen={setActiveScreen} />;
      case 'LoginScreen':
        return <LoginScreen setActiveScreen={setActiveScreen} />;
      case 'RegisterScreen':
        return <RegisterScreen setActiveScreen={setActiveScreen} />;
      case 'HomeScreen':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'BookingScreen':
        return <BookingScreen setActiveScreen={setActiveScreen} />;
      case 'ReviewPage':
        return <ReviewPage setActiveScreen={setActiveScreen} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <FlightProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>{renderScreen()}</View>
        {activeScreen !== 'Splash' && activeScreen !== 'WelcomeScreen' && activeScreen !== 'LoginScreen' && activeScreen !== 'RegisterScreen' && (
          <NavigationBar setActiveScreen={setActiveScreen} />
        )}
      </SafeAreaView>
    </FlightProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
