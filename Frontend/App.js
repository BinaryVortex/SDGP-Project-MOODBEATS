import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import songplayer from '..src/songplayer';

export default function App() {
  return (
    <songplayer/>
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

