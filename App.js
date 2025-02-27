import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MoodSelectionScreen from './src/Moodpage';
import LoginScreen from './src/login';
import MusicPlaylistApp from './src/playlists';
import SignInScreen from './src/signin';
import MoodRecognition from './src/VoiceRecog';

export default function App() {
  return (
    <LoginScreen/>
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
