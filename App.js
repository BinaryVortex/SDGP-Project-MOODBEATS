import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/Home';
import OTPVerification from './src/OTP_pin';
import SignInProfile from './src/Sign-in_profile';
import Recentlyplayed from './src/Recently_played';
import MoodBeatsPreview from './src/Recently_played';
import FilterPre from './src/Filter';
import Folders from './src/Folders';
import Search from './src/Search_bar';

export default function App() {
  return (
    <Search/>
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
