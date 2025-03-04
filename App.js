import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/Home';
import OTPVerification from './src/OTP_pin';
import SignInProfile from './src/Sign-in_profile';
import Recentlyplayed from './src/Recently_played';
import Filter from './src/Filter';

export default function App() {
  return (
    <HomePage/>
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
