import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

// API URL for Emotion Detection
const API_URL = 'https://your-emotion-api-endpoint.com/predict';

export default function EmotionDetectionApp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [detecting, setDetecting] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setFaceDetected(faces.length > 0);
  };

  const captureImage = async () => {
    if (!faceDetected) {
      Alert.alert('No face detected', 'Please position your face in the camera view');
      return;
    }

    try {
      setDetecting(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

      // Resize the image to speed up API processing
      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 300 } }],
        { format: 'jpeg', compress: 0.8 }
      );

      // Convert image to base64
      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Send to API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) throw new Error('Failed to analyze emotion');

      const result = await response.json();
      setEmotion(result.emotion);
      setConfidence(result.confidence);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setDetecting(false);
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: '#FFD700',
      sad: '#6495ED',
      angry: '#FF6347',
      surprised: '#9370DB',
      fearful: '#9932CC',
      disgusted: '#3CB371',
      neutral: '#F5F5F5',
    };
    return colors[emotion?.toLowerCase()] || '#FFFFFF';
  };

  const getEmoticonForEmotion = (emotion) => {
    const emoticons = {
      happy: '😄',
      sad: '😢',
      angry: '😠',
      surprised: '😲',
      fearful: '😨',
      disgusted: '🤢',
      neutral: '😐',
    };
    return emoticons[emotion?.toLowerCase()] || '❓';
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
        
        {faceDetected && (
          <View style={styles.faceDetectedIndicator}>
            <Text style={styles.faceDetectedText}>Face Detected</Text>
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.captureButton, detecting && styles.disabledButton]}
          onPress={captureImage}
          disabled={detecting}>
          {detecting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.captureText}>Analyze Emotion</Text>
          )}
        </TouchableOpacity>
      </View>

      {emotion && (
        <View style={[styles.resultContainer, { backgroundColor: getEmotionColor(emotion) }]}>
          <Text style={styles.emoticon}>{getEmoticonForEmotion(emotion)}</Text>
          <Text style={styles.emotionText}>{emotion.toUpperCase()}</Text>
          <Text style={styles.confidenceText}>
            Confidence: {(confidence * 100).toFixed(2)}%
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111',
  },
  flipButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  flipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  captureButton: {
    padding: 15,
    backgroundColor: '#4169E1',
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  captureText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  emoticon: {
    fontSize: 50,
    marginBottom: 10,
  },
  emotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  confidenceText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  faceDetectedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    padding: 8,
    borderRadius: 5,
  },
  faceDetectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
