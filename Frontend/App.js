import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Moodbasedsongs from '../src/Moodbasedsongs';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Moodbasedsongs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Ensure background is visible
  },
});