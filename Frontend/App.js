import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LyricsPlayer from './src/LyricsPlayer'; // Adjust the path based on your file structure

export default function App() {
  return (
    <SafeAreaProvider>
      <LyricsPlayer />
    </SafeAreaProvider>
  );
}