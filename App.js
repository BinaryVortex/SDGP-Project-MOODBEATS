import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MoodSelectionScreen from './src/Moodpage';
import LoginScreen from './src/login';
import MusicPlaylistApp from './src/playlists';
import SignInScreen from './src/signup';
import MoodRecognition from './src/VoiceRecog';
import SignUpScreen from './src/signup';

export default function App() {
  return (
    <MoodRecognition/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
