import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FaceRecognition from './src/FaceRecognition';

export default function App() {
  return (
    
    <FaceRecognition 
  onMoodDetected={(mood) => {
    console.log(`Detected mood: ${mood}`);
    // Handle the detected mood
  }}
/>
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
