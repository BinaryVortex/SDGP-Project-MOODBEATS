import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Alert,
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
  const [type, setType] = useState(null);
  const [facesDetected, setFacesDetected] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
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
      try {
        // Request camera permissions
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        
        // Set camera type safely
        if (Camera.Constants && Camera.Constants.Type) {
          setType(Camera.Constants.Type.front);
        } else {
          console.log("Camera.Constants.Type is undefined, using fallback");
          setType(1); // Fallback for front camera
        }
      } catch (error) {
        console.error("Error initializing camera:", error);
        Alert.alert(
          "Camera Error",
          "Unable to initialize camera. Please restart the app.",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  // Enhanced face detection function with more accurate mood analysis
  const handleFaceDetected = ({ faces }) => {
    // Update faces detected count for UI feedback
    setFacesDetected(faces.length);
    
    if (faces.length > 0 && step === 'scanning' && !isProcessing) {
      setIsProcessing(true);
      
      // Collect facial expression data for better analysis
      const faceData = faces[0];
      
      // After detecting a face, analyze expressions
      setTimeout(() => {
        try {
          // Enhanced mood detection algorithm
          const smileValue = faceData.smilingProbability || 0;
          const rightEyeOpen = faceData.rightEyeOpenProbability || 0;
          const leftEyeOpen = faceData.leftEyeOpenProbability || 0;
          
          // More nuanced mood detection
          let mood;
          if (smileValue > 0.7) {
            mood = 'happy';
          } else if (smileValue > 0.4) {
            mood = 'content';
          } else if (rightEyeOpen < 0.3 && leftEyeOpen < 0.3) {
            mood = 'relaxed';
          } else if (faceData.faceID && faceData.faceID.includes('frown')) {
            mood = 'angry';
          } else if (smileValue < 0.2) {
            mood = 'sad';
          } else {
            mood = 'neutral';
          }
          
          // Set detected mood and move to success screen
          setDetectedMood(mood);
          setStep('success');
        } catch (error) {
          console.error("Error analyzing face:", error);
          Alert.alert(
            "Analysis Error",
            "Unable to analyze facial expressions. Please try again.",
            [{ text: "Try Again", onPress: () => setStep('camera') }]
          );
        } finally {
          setIsProcessing(false);
        }
      }, 2000); // Shortened the processing time for better UX
    }
  };

  const handleCameraReady = () => {
    console.log("Camera is ready");
    setCameraReady(true);
  };

  const startFaceRecognition = () => {
    setStep('camera');
  };

  const startScanning = () => {
    if (cameraReady) {
      setStep('scanning');
      // Auto-start face detection after a short delay
      setTimeout(() => {
        if (facesDetected === 0) {
          // Provide feedback if no face is detected after a while
          Alert.alert(
            "No Face Detected",
            "Please ensure your face is clearly visible in the frame",
            [{ text: "OK" }]
          );
        }
      }, 5000);
    } else {
      Alert.alert(
        "Camera Not Ready",
        "Please wait for the camera to initialize",
        [{ text: "OK" }]
      );
    }
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
        <Text style={styles.errorSubtext}>Please enable camera access in your device settings</Text>
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

  // Check if camera type is defined before showing camera screen
  if (step === 'camera' && type === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </View>
    );
  }

  // Render camera screen - IMPROVED VERSION
  if (step === 'camera' && type !== null) {
    // Improved error handling for Camera component
    try {
      return (
        <View style={styles.cameraContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            onCameraReady={handleCameraReady}
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
              <Text style={styles.instructionText}>
                {cameraReady 
                  ? 'Position your face in the frame' 
                  : 'Camera initializing...'}
              </Text>
              {facesDetected > 0 && (
                <Text style={styles.faceDetectedText}>Face detected!</Text>
              )}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.captureButton, 
                !cameraReady && styles.captureButtonDisabled
              ]} 
              onPress={startScanning}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } catch (error) {
      console.error("Error rendering camera:", error);
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to access camera</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
          <TouchableOpacity style={styles.errorButton} onPress={handleBack}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  // Render scanning screen with improved feedback
  if (step === 'scanning') {
    return (
      <SafeAreaView style={styles.scanningContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.scanningContent}>
          <View style={styles.scanningIconContainer}>
            <View style={styles.scanningPulse} />
            <View style={styles.scanningIcon}>
              <Text style={styles.faceRecognitionIcon}>{'﹅﹅\n ◡'}</Text>
            </View>
          </View>
          <Text style={styles.scanningText}>Scanning your face</Text>
          <Text style={styles.scanningSubtext}>
            {facesDetected > 0 
              ? 'Analyzing your facial expressions...' 
              : 'Please stay still for a moment'}
          </Text>
          
          {/* Added loading indicator */}
          <ActivityIndicator 
            size="large" 
            color="#FF6600" 
            style={styles.scanningIndicator} 
          />
          
          {/* Cancel button */}
          <TouchableOpacity 
            style={styles.cancelScanButton} 
            onPress={() => setStep('camera')}
          >
            <Text style={styles.cancelScanText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Render success screen with enhanced mood detection results
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
            <Text style={styles.moodDescription}>
              {detectedMood === 'happy' && "You seem happy! Let's play some upbeat music."}
              {detectedMood === 'sad' && "You seem a bit down. How about some uplifting tunes?"}
              {detectedMood === 'relaxed' && "You look relaxed. We'll find some chill music for you."}
              {detectedMood === 'angry' && "You seem tense. Let's play something to help you unwind."}
              {detectedMood === 'content' && "You look content. We'll find something pleasant for you."}
            </Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>View Recommended Playlist</Text>
        </TouchableOpacity>
        
        {/* Try again option */}
        <TouchableOpacity 
          style={styles.tryAgainButton} 
          onPress={() => setStep('camera')}
        >
          <Text style={styles.tryAgainText}>Try Again</Text>
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
    marginBottom: 10,
  },
  faceDetectedText: {
    color: '#4dff4d',
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
  captureButtonDisabled: {
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
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
  
  // Scanning screen styles
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
    position: 'relative',
  },
  scanningIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  scanningPulse: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: 'rgba(77, 255, 77, 0.2)',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    zIndex: 1,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  scanningIndicator: {
    marginTop: 20,
    marginBottom: 30,
  },
  cancelScanButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6600',
  },
  cancelScanText: {
    color: '#FF6600',
    fontSize: 16,
  },
  
  // Success screen styles
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
    marginBottom: 10,
  },
  moodDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: 300,
  },
  continueButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tryAgainButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  tryAgainText: {
    color: '#FF6600',
    fontSize: 16,
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
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtext: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
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