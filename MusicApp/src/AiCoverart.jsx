import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { API_URL } from './api';

const AiCoverart = () => {
  const [prompt, setPrompt] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
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
      const response = await axios.post(`${API_URL}/generate-image`, {
        prompt: textPrompt,
      });

      if (response.data.imageUrl) {
        setGeneratedImage(response.data.imageUrl);
      }
    } catch (err) {
      console.error('Failed to generate image', err);
      Alert.alert('Error', 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  // Test the backend connection
  const testBackendConnection = async () => {
    try {
      const response = await axios.get(`${API_URL}/test`);
      Alert.alert('Connection Test', response.data.message);
    } catch (error) {
      Alert.alert('Connection Failed', 
        `Could not connect to the backend server: ${error.message}\n` +
        `Attempting to connect to: ${API_URL}`
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
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

        <TouchableOpacity 
          style={styles.testButton}
          onPress={testBackendConnection}
        >
          <Text style={styles.testButtonText}>Test Backend Connection</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Creating your album cover...</Text>
        </View>
      ) : generatedImage ? (
        <View style={styles.resultContainer}>
          <Image source={{ uri: generatedImage }} style={styles.generatedImage} />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
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
  testButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: '#6200ee',
    fontSize: 14,
  },
});

export default AiCoverart;