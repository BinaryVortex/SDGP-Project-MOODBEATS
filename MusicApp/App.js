import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MusicApp from './src/MusicApp';
import MusicappPlaylist from './src/MusicappPlaylist';

export default function App() {
  return (
    <MusicApp/>
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
