import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MusicApp from './src/MusicApp';
import MusicappPlaylist from './src/MusicappPlaylist';
import AiCoverart from './src/AiCoverart';


export default function App() {
  return (
    <AiCoverart/>
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
