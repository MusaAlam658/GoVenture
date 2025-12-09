import React from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function TopNavbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navText}>GoVenture</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#002B5C',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: height * 0.1,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
