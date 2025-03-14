// App.jsx - Main React Native Application

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import { API_URL } from './config';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentImages, setRecentImages] = useState([]);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Please allow microphone access to use voice features');
        }
      }
    })();
  }, []);

  // Start recording audio
  const startRecording = async () => {
    try {
      // Clear any previous recording
      if (recording) {
        await recording.stopAndUnloadAsync();
      }

      // Set up recording options
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create new recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  // Stop recording and process the audio
  const stopRecording = async () => {
    setIsRecording(false);
    
    if (!recording) return;
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      await processVoicePrompt(uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to process recording');
    }
  };

  // Process voice recording by sending to backend for transcription
  const processVoicePrompt = async (audioUri) => {
    setLoading(true);
    
    try {
      // Create form data with audio file
      const formData = new FormData();
      formData.append('audio', {
        uri: audioUri,
        type: 'audio/m4a',
        name: 'recording.m4a',
      });

      // Send to backend for transcription
      const response = await axios.post(`${API_URL}/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.text) {
        // Set the transcribed text as prompt and generate image
        setPrompt(response.data.text);
        await generateImageFromPrompt(response.data.text);
      }
    } catch (err) {
      console.error('Failed to process voice prompt', err);
      Alert.alert('Error', 'Failed to process voice recording');
      setLoading(false);
    }
  };

  // Generate image from text prompt
  const generateImageFromPrompt = async (textPrompt = prompt) => {
    if (!textPrompt.trim()) {
      Alert.alert('Error', 'Please enter a text prompt or record a voice prompt');
      return;
    }
    
    setLoading(true);
    
    try {
      // Enhanced prompt for better album cover generation
      const enhancedPrompt = `Create a professional album cover art for a song with the theme: ${textPrompt}`;
      
      const response = await axios.post(`${API_URL}/generate-image`, {
        prompt: enhancedPrompt,
      });

      if (response.data.imageUrl) {
        setGeneratedImage(response.data.imageUrl);
        
        // Add to recent images
        setRecentImages(prev => [response.data.imageUrl, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      console.error('Failed to generate image', err);
      Alert.alert('Error', 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  // Save generated image to device
  const saveImage = async () => {
    if (!generatedImage) return;
    
    try {
      const filename = FileSystem.documentDirectory + `album_cover_${Date.now()}.png`;
      await FileSystem.downloadAsync(generatedImage, filename);
      
      // Share the image
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await Sharing.shareAsync(filename);
      }
      
      Alert.alert('Success', 'Image saved successfully!');
    } catch (err) {
      console.error('Failed to save image', err);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Song Cover Generator</Text>
          <Text style={styles.subtitle}>Create album art from text or voice</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Describe your song or album cover..."
            value={prompt}
            onChangeText={setPrompt}
            multiline
          />
          
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.generateButton]}
              onPress={() => generateImageFromPrompt()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Generate Image</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.recordButton, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Voice Prompt'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.loadingText}>Creating your album cover...</Text>
          </View>
        ) : generatedImage ? (
          <View style={styles.resultContainer}>
            <Image source={{ uri: generatedImage }} style={styles.generatedImage} />
            
            <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
              <Text style={styles.saveButtonText}>Save & Share</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {recentImages.length > 0 && (
          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Recent Covers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentImages.map((img, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setGeneratedImage(img)}
                >
                  <Image source={{ uri: img }} style={styles.recentImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d1d1f',
  },
  subtitle: {
    fontSize: 16,
    color: '#86868b',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '48%',
  },
  generateButton: {
    backgroundColor: '#6200ee',
  },
  recordButton: {
    backgroundColor: '#03dac6',
  },
  recordingButton: {
    backgroundColor: '#cf6679',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200ee',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  generatedImage: {
    width: '100%',
    height: 350,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recentContainer: {
    marginTop: 30,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
});

export default App;