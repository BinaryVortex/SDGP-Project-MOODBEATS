import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function EmotionDetectionApp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [emotion, setEmotion] = useState('Detecting emotion...');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      // Map the face detector values to emotion labels
      // This is a simplified version of emotion detection
      // In a real app, you'd use a proper ML model through TensorFlow.js or API
      const face = faces[0];
      
      // Using smileDetected as a simple proxy for emotion
      if (face.smilingProbability > 0.7) {
        setEmotion('Emotion: happy');
      } else if (face.leftEyeOpenProbability < 0.3 && face.rightEyeOpenProbability < 0.3) {
        setEmotion('Emotion: sleepy');
      } else {
        setEmotion('Emotion: neutral');
      }
    } else {
      setEmotion('No face detected');
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ref={cameraRef}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      <View style={styles.emotionContainer}>
        <Text style={styles.emotionText}>{emotion}</Text>
      </View>
    </SafeAreaView>
  );
}


;