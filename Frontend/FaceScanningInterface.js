import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FaceScanningInterface() {
  const [image, setImage] = useState(null);
  const [mood, setMood] = useState('Unknown');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Request camera permission
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is required!');
      return false;
    }
    return true;
  };

  // Simple mock mood detection
  const detectMood = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      const moods = ['Happy', 'Sad', 'Surprised', 'Angry', 'Neutral', 'Sleepy', 'Excited'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(randomMood);
      setIsAnalyzing(false);
    }, 1500); // Wait 1.5 seconds to simulate "analysis"
  };

  // Capture image using device camera
  const pickImage = async () => {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) {
      return;
    }

    try {
      // Launch camera to capture the image
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) {
        console.log('Image capture was cancelled');
        return;
      }

      if (result.assets && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        console.log('Captured image URI:', uri);
        setImage(uri);
        detectMood(); // Detect mood after capturing
      } else {
        Alert.alert('Error', 'Failed to capture image');
      }
    } catch (error) {
      console.log('Error launching camera:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  // Handle continue button press
  const handleContinue = () => {
    // Add navigation to next screen here
    console.log('Continue button pressed. Mood detected:', mood);
    Alert.alert('Success', 'Moving to next page with mood: ' + mood);
    // For actual navigation you would use React Navigation, for example:
    // navigation.navigate('NextScreen', { detectedMood: mood });
  };

  return (
    <View style={styles.container}>
      {/* App Logo/Icon at the top */}
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3314/3314439.png' }} 
        style={styles.logoImage}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Mood Detector</Text>
      
      {/* Replace Button with TouchableOpacity for custom styling */}
      <TouchableOpacity 
        style={styles.captureButton}
        onPress={pickImage} 
        disabled={isAnalyzing}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>
      
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      
      {isAnalyzing ? (
        <View style={styles.analysisContainer}>
          <ActivityIndicator size="small" color="#800080" />
          <Text style={styles.analysisText}>Analyzing facial expression...</Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>
            Detected Mood: <Text style={[styles.mood, getMoodStyle(mood)]}>{mood}</Text>
          </Text>
        </View>
      )}

      {/* Continue button - only shown after mood is detected and not "Unknown" */}
      {mood !== 'Unknown' && !isAnalyzing && (
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Function to get style based on mood
const getMoodStyle = (mood) => {
  switch(mood) {
    case 'Happy':
      return { color: '#4CAF50' }; // Green
    case 'Sad':
      return { color: '#2196F3' }; // Blue
    case 'Angry':
      return { color: '#F44336' }; // Red
    case 'Surprised':
      return { color: '#FF9800' }; // Orange
    case 'Excited':
      return { color: '#9C27B0' }; // Purple
    default:
      return { color: '#607D8B' }; // Gray for Neutral, Sleepy, Unknown
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  captureButton: {
    backgroundColor: '#800080', // Purple (#800080)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButton: {
    backgroundColor: '#800080', // Same purple as capture button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  analysisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  analysisText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  mood: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});