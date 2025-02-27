import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Ionicons } from '@expo/vector-icons';

const FaceRecognition = ({ navigation, onMoodDetected }) => {
  const [step, setStep] = useState('options'); // 'options', 'camera', 'scanning', 'success', 'moodSelection', 'moodSuccess'
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const cameraRef = useRef(null);

  const moodOptions = [
    { label: 'happy', emoji: '😀' },
    { label: 'sad', emoji: '😢' },
    { label: 'relaxed', emoji: '😌' },
    { label: 'angry', emoji: '😡' },
    { label: 'content', emoji: '😊' },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFaceDetected = ({ faces }) => {
    if (faces.length > 0 && step === 'scanning' && !isProcessing) {
      setIsProcessing(true);
      
      // After detecting a face, simulate processing
      setTimeout(() => {
        // Analyze face and determine mood based on facial expressions
        const smileValue = faces[0].smilingProbability || 0;
        const rightEyeOpen = faces[0].rightEyeOpenProbability || 0;
        const leftEyeOpen = faces[0].leftEyeOpenProbability || 0;
        
        // Simplified mood detection algorithm
        let mood;
        if (smileValue > 0.7) {
          mood = 'happy';
        } else if (smileValue > 0.4) {
          mood = 'content';
        } else if (rightEyeOpen < 0.3 && leftEyeOpen < 0.3) {
          mood = 'relaxed';
        } else if (faces[0].faceID && faces[0].faceID.includes('frown')) {
          mood = 'angry';
        } else {
          mood = 'neutral';
        }
        
        setDetectedMood(mood);
        setStep('success');
        setIsProcessing(false);
      }, 3000);
    }
  };

  const startFaceRecognition = () => {
    setStep('camera');
  };

  const startScanning = () => {
    setStep('scanning');
  };

  const startManualMoodSelection = () => {
    setStep('moodSelection');
  };

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    setStep('moodSuccess');
  };

  const getMoodEmoji = (mood) => {
    const foundMood = moodOptions.find(option => option.label === mood);
    return foundMood ? foundMood.emoji : '😐';
  };

  const handleContinue = () => {
    const finalMood = detectedMood || selectedMood;
    if (onMoodDetected) {
      onMoodDetected(finalMood);
    }
    if (navigation) {
      navigation.navigate('Playlist', { mood: finalMood });
    }
  };

  const handleBack = () => {
    if (step === 'camera' || step === 'scanning') {
      setStep('options');
    } else if (step === 'success') {
      setStep('camera');
    } else if (step === 'moodSelection' || step === 'moodSuccess') {
      setStep('options');
    } else if (navigation) {
      navigation.goBack();
    }
  };

  // Permission error handling
  if (hasPermission === false) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Camera permission is required for face recognition</Text>
        <TouchableOpacity style={styles.errorButton} onPress={handleBack}>
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === null && (step === 'camera' || step === 'scanning')) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  // Render options screen
  if (step === 'options') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Logo</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchText}>Search</Text>
            <Ionicons name="search" size={20} color="#666" />
          </View>
        </View>
        
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Text style={styles.navText}>Mood Recognition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Playlist</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Which option would you prefer?</Text>
          
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={startFaceRecognition}
          >
            <View style={styles.iconBox}>
              <Text style={styles.faceRecognitionIcon}>{'﹅﹅\n ◡'}</Text>
            </View>
            <Text style={styles.optionText}>Face Recognition</Text>
          </TouchableOpacity>
          
          <Text style={styles.orText}>Or</Text>
          
          <TouchableOpacity 
            style={styles.moodSelectionContainer} 
            onPress={startManualMoodSelection}
          >
            <View style={styles.emojisContainer}>
              {moodOptions.map((mood) => (
                <Text key={mood.label} style={styles.emoji}>{mood.emoji}</Text>
              ))}
            </View>
            <Text style={styles.optionText}>Mood selection interface</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render mood selection screen
  if (step === 'moodSelection') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButtonHeader}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Your Mood</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.moodSelectionScreen}>
          <Text style={styles.moodSelectionTitle}>How are you feeling today?</Text>
          <Text style={styles.moodSelectionSubtitle}>Tap on the emoji that best represents your current mood</Text>
          
          <View style={styles.moodGrid}>
            {moodOptions.map((mood) => (
              <TouchableOpacity 
                key={mood.label}
                style={styles.moodCard}
                onPress={() => handleMoodSelection(mood.label)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Render mood success screen
  if (step === 'moodSuccess') {
    return (
      <SafeAreaView style={styles.successContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.successContent}>
          <View style={styles.successIconContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmarkIcon}>✓</Text>
            </View>
          </View>
          <Text style={styles.successText}>Mood selected successfully!</Text>
          <Text style={styles.successSubtext}>You're all set. Enjoy your music</Text>
          
          <View style={styles.moodResultContainer}>
            <Text style={styles.moodResultTitle}>Your Mood:</Text>
            <Text style={styles.moodResultEmoji}>{getMoodEmoji(selectedMood)}</Text>
            <Text style={styles.moodResultText}>{selectedMood}</Text>
          </View>
          
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>View Recommended Playlist</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render camera screen
  if (step === 'camera') {
    return (
      <View style={styles.cameraContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onFacesDetected={handleFaceDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
        <View style={styles.cameraOverlay}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.cameraInstructions}>
            <Text style={styles.instructionText}>Position your face in the frame</Text>
          </View>
          
          <TouchableOpacity style={styles.captureButton} onPress={startScanning}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Render scanning screen (matches Image 2)
  if (step === 'scanning') {
    return (
      <SafeAreaView style={styles.scanningContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.scanningContent}>
          <View style={styles.scanningIconContainer}>
            <View style={styles.scanningIcon}>
              <Text style={styles.faceRecognitionIcon}>{'﹅﹅\n ◡'}</Text>
            </View>
          </View>
          <Text style={styles.scanningText}>Scanning your face</Text>
          <Text style={styles.scanningSubtext}>Please stay still for a moment</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render success screen (matches Image 1)
  return (
    <SafeAreaView style={styles.successContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.successContent}>
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmarkIcon}>✓</Text>
          </View>
        </View>
        <Text style={styles.successText}>Face recognized successfully!</Text>
        <Text style={styles.successSubtext}>You're all set. Enjoy your music</Text>
        
        {detectedMood && (
          <View style={styles.moodResultContainer}>
            <Text style={styles.moodResultTitle}>Detected Mood:</Text>
            <Text style={styles.moodResultEmoji}>{getMoodEmoji(detectedMood)}</Text>
            <Text style={styles.moodResultText}>{detectedMood}</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>View Recommended Playlist</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Container and common styles
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  
  // Header and navigation styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6600',
    padding: 15,
    paddingTop: StatusBar.currentHeight + 15,
  },
  backButtonHeader: {
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchText: {
    color: '#666',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FF6600',
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  navText: {
    color: 'white',
    fontWeight: '500',
  },
  
  // Options screen styles
  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  optionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionButton: {
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  faceRecognitionIcon: {
    color: '#4dff4d',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
  },
  orText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  moodSelectionContainer: {
    alignItems: 'center',
  },
  emojisContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  
  // Camera screen styles
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginTop: 30,
  },
  cameraInstructions: {
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  captureButton: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  // Mood Selection screen styles
  moodSelectionScreen: {
    padding: 20,
    alignItems: 'center',
  },
  moodSelectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
  },
  moodSelectionSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 40,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  moodCard: {
    width: 120,
    height: 120,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodLabel: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  
  // Scanning screen styles (Image 2)
  scanningContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scanningContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanningIconContainer: {
    marginBottom: 32,
  },
  scanningIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  scanningSubtext: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  
  // Success screen styles (Image 1)
  successContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIconContainer: {
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    color: '#4dff4d',
    fontSize: 32,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtext: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginBottom: 40,
  },
  moodResultContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  moodResultTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  moodResultEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  moodResultText: {
    fontSize: 24,
    color: 'white',
    textTransform: 'capitalize',
  },
  continueButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Error and loading styles
  errorContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
});

export default FaceRecognition;