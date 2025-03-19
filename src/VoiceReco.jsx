import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  TextInput,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const MoodRecognition = ({ setPage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const moods = ['Happy', 'Sad', 'Angry', 'Neutral', 'Excited'];

  useEffect(() => {
    let animation;
    let timer;

    if (isRecording) {
      animation = Animated.loop(
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
      );
      animation.start();

      timer = setTimeout(() => {
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        const randomConfidence = Math.floor(Math.random() * 30) + 70;
        setDetectedMood(randomMood);
        setConfidence(randomConfidence);
        setIsRecording(false);
      }, 3000);
    }

    return () => {
      animation?.stop();
      clearTimeout(timer);
      pulseAnim.setValue(1);
    };
  }, [isRecording, pulseAnim]);

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

  const NavItem = ({ icon, label, color }) => (
    <TouchableOpacity style={styles.navItem}>
      <Feather name={icon} size={20} color={color || "#bbb"} />
      <Text style={[styles.navLabel, { color: color || "#bbb" }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['black', '#800080', 'black']}
        locations={[0, 0.6, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.logoText}>MOODBEATS</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Search" placeholderTextColor="#aaa" style={styles.searchInput} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Voice Mood Recognition</Text>
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
            <View style={styles.recordButtonContent}>
              <Icon name="microphone" size={32} color={isRecording ? '#666' : '#fff'} />
              <Text style={styles.recordButtonText}>
                {isRecording ? 'Recording...' : 'Start Recording'}
              </Text>
            </View>
          </TouchableOpacity>

          {detectedMood && (
            <View style={styles.resultContainer}>
              <Text style={styles.moodText}>Detected Mood:</Text>
              <Text style={[styles.moodResult, { color: getMoodColor() }]}>
                {detectedMood}
              </Text>
              <Text style={styles.confidenceText}>Confidence: {confidence}%</Text>
            </View>
          )}
        </View>

        {/* Bottom Navigation Bar - Exact copy from MusicPlaylistApp */}
        <View style={styles.navbar}>
          <NavItem icon="home" label="Home" color="white" />
          <NavItem icon="heart" label="Mood" color="#FF00FF" />
          <NavItem icon="music" label="Playlists" color="white" />
          <NavItem icon="user" label="Profile" color="white" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradient: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#bbb',
    marginTop: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 10,
    width: 144,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
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
  recordButtonContent: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 90,
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