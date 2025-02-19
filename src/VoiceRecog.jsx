import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'lucide-react';

const MoodRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [confidence, setConfidence] = useState(0);
  
  // Animation value for the recording indicator
  const pulseAnim = new Animated.Value(1);

  // Simulate mood detection with random moods
  const moods = ['Happy', 'Sad', 'Angry', 'Neutral', 'Excited'];
  
  useEffect(() => {
    if (isRecording) {
      // Pulse animation for recording indicator
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

      // Simulate mood detection after 3 seconds
      const timer = setTimeout(() => {
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-99%
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
          <Camera size={32} color={isRecording ? '#666' : '#fff'} />
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Recording...' : 'Start Recording'}
          </Text>
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
