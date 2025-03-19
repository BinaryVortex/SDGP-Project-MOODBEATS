import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from './src/Home';
import OTPVerification from './src/OTP_pin';
import SignInProfile from './src/Sign-in_profile';
import Recentlyplayed from './src/Recently_played';
import FilterPre from './src/Filter';
import Folders from './src/Folders';
import Search from './src/Search_bar';
import { useState } from 'react';
import MoodSelectionScreen from './src/Moodpage';
import MoodRecognition from './src/VoiceReco';
import MusicPlaylistApp from './src/Playlist';
import MoodbeatsApp from './src/Folders';
import MoodBeatsPreview from './src/Recently_played';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    (page == "home") ? <HomePage setPage={setPage}/> : (page == "heart") ? <MoodSelectionScreen setPage={setPage}/> : (page == "music") ? <MoodbeatsApp setPage={setPage}/> : (page == "recent") ? <Recentlyplayed setPage={setPage}/> : (page == "expanded") ? <MusicPlaylistApp setPage={setPage}/> : (page == "Recently Played") ? <MoodBeatsPreview setPage={setPage}/> : <SignInProfile/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
