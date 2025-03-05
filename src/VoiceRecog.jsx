import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MoodRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const pulseAnim = new Animated.Value(1);

  const moods = ['Happy', 'Sad', 'Angry', 'Neutral', 'Excited'];

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer = setTimeout(() => {
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        const randomConfidence = Math.floor(Math.random() * 30) + 70;
        setDetectedMood(randomMood);
        setConfidence(randomConfidence);
        setIsRecording(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setDetectedMood(null);
    setConfidence(0);
  };

  const getMoodColor = () => {
    switch (detectedMood) {
      case 'Happy':
        return '#FFD700';
      case 'Sad':
        return '#4682B4';
      case 'Angry':
        return '#DC143C';
      case 'Excited':
        return '#FF69B4';
      default:
        return '#808080';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlurView style={styles.blurBackground} blurType="dark" blurAmount={10} />

      <View style={styles.header}>
        <Text style={styles.title}>Voice Mood Recognition</Text>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.recordingIndicator,
            {
              transform: [{ scale: pulseAnim }],
              backgroundColor: isRecording ? '#FF4444' : '#666',
            },
          ]}
        />

        <TouchableOpacity
          style={styles.recordButton}
          onPress={handleStartRecording}
          disabled={isRecording}
        >
          <View style={styles.blurContainer}>
            <Icon name="microphone" size={32} color={isRecording ? '#666' : '#fff'} />
            <Text style={styles.recordButtonText}>
              {isRecording ? 'Recording...' : 'Start Recording'}
            </Text>
          </View>
        </TouchableOpacity>

        {detectedMood && (
          <View style={styles.resultContainer}>
            <Text style={styles.moodText}>Detected Mood:</Text>
            <Text
              style={[
                styles.moodResult,
                { color: getMoodColor() },
              ]}
            >
              {detectedMood}
            </Text>
            <Text style={styles.confidenceText}>
              Confidence: {confidence}%
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  recordingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
    marginBottom: 30,
  },
  blurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moodText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  moodResult: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confidenceText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MoodRecognition;
