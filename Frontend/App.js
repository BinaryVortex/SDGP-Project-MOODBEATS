import React from 'react';
import { SafeAreaView } from 'react-native';
import songdisplay from './src/songdisplay'; // If file is lowercase
 // Import from src folder

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <songdisplay />
    </SafeAreaView>
  );
}
