import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

// API URL - Change this to match your backend URL
const API_URL = 'http://192.168.1.6:8000/generate-music/';

// Mood emoji mapping
const moodEmojis = {
  happy: '😊',
  sad: '😢',
  relaxed: '😌',
  energetic: '⚡',
};

// Mood colors 
const moodColors = {
  happy: '#bf13bf',
  sad: '#bf13bf',
  relaxed: '#bf13bf',
  energetic: '#bf13bf',
};

const MusicGen = () => {
  const [mood, setMood] = useState('happy');
  const [duration, setDuration] = useState(15);
  const [generatedTracks, setGeneratedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState();
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  // Create animated rotation for loading
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // Start rotation animation for loading
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [loading]);

  // Fade in animation when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Clean up sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Function to handle progress updates for playing tracks
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.durationMillis > 0) {
      const newProgress = status.positionMillis / status.durationMillis;
      setProgress(newProgress);
    }
    
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPlayingTrackId(null);
      setProgress(0);
    }
  };

  // Function to generate music
  const generateMusic = async () => {
    try {
      setLoading(true);
      
      // Haptic feedback if available
      if (Platform.OS === 'ios' && typeof Haptics !== 'undefined') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood,
          duration: parseInt(duration),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate music');
      }
  
      const data = await response.json();
      
      // Add new track to the list with animation
      const newTrack = {
        id: Date.now().toString(),
        filePath: data.file_path,
        mood: data.mood,
        duration: data.duration,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setGeneratedTracks(prevTracks => [newTrack, ...prevTracks]);
      
      // Use custom success notification
      showSuccessToast(`Generated ${data.mood} music for ${data.duration}s!`);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error generating music:', error);
    } finally {
      setLoading(false);
    }
  };

  // Custom toast implementation
  const showSuccessToast = (message) => {
    // You could implement a custom toast here
    // For now, we'll use Alert
    Alert.alert(
      '🎵 Success!',
      message,
      [{ text: 'Listen Now', onPress: () => {
        if (generatedTracks.length > 0) {
          playSound(generatedTracks[0].id, generatedTracks[0].filePath);
        }
      }}]
    );
  };

  // Function to play the audio
  const playSound = async (trackId, filePath) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setProgress(0);
      
      if (playingTrackId === trackId) {
        setPlayingTrackId(null);
        return;
      }
    }
  
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.1.6:8000/audio/${filePath}` },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setPlayingTrackId(trackId);
      setIsPlaying(true);
  
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      Alert.alert('Error', 'Failed to play the audio file');
      console.error('Error playing sound:', error);
    }
  };

  // Creates a play/pause icon text for the track
  const renderPlayIcon = () => {
    return isPlaying ? '■' : '▶';
  };

  // Get available moods
  const availableMoods = Object.keys(moodEmojis);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.title}>MOODBEATS</Text>
          <Text style={styles.subtitle}>Mood-based Music Generator</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Your Mood:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodScrollContainer}
          >
            {availableMoods.map((moodOption) => (
              <TouchableOpacity
                key={moodOption}
                style={[
                  styles.moodButton,
                  mood === moodOption && [
                    styles.selectedMoodButton,
                    { borderColor: moodColors[moodOption] }
                  ],
                ]}
                onPress={() => setMood(moodOption)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodEmoji}>{moodEmojis[moodOption]}</Text>
                <Text
                  style={[
                    styles.moodButtonText,
                    mood === moodOption && [
                      styles.selectedMoodButtonText,
                      { color: moodColors[moodOption] }
                    ],
                  ]}
                >
                  {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.durationContainer}>
            <Text style={styles.label}>
              Duration: <Text style={[styles.durationValue, { color: moodColors[mood] }]}>
                {duration} seconds
              </Text>
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={5}
              maximumValue={60}
              step={5}
              value={duration}
              onValueChange={setDuration}
              minimumTrackTintColor={moodColors[mood]}
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor={moodColors[mood]}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>5s</Text>
              <Text style={styles.sliderLabel}>60s</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.generateButton, 
              { backgroundColor: moodColors[mood], opacity: loading ? 0.8 : 1 }
            ]}
            onPress={generateMusic}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Text style={styles.loadingText}>🎵</Text>
              </Animated.View>
            ) : (
              <>
                <Text style={styles.buttonIcon}>🎵</Text>
                <Text style={styles.generateButtonText}>Generate Music</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Your Music Library</Text>
            {generatedTracks.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setGeneratedTracks([])}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {generatedTracks.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateIcon}>🎧</Text>
              <Text style={styles.noTracksText}>No tracks generated yet</Text>
              <Text style={styles.emptyStateInstructions}>
                Select a mood and duration, then tap "Generate Music" to create your first track!
              </Text>
            </View>
          ) : (
            <ScrollView 
              style={styles.tracksList}
              showsVerticalScrollIndicator={false}
            >
              {generatedTracks.map((track) => (
                <TouchableOpacity
                  key={track.id}
                  style={[
                    styles.trackItem,
                    playingTrackId === track.id && [
                      styles.playingTrackItem,
                      { borderLeftColor: moodColors[track.mood] }
                    ],
                  ]}
                  onPress={() => playSound(track.id, track.filePath)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.trackContentContainer,
                    playingTrackId === track.id && { backgroundColor: '#F0F0FF' }
                  ]}>
                    <View style={styles.trackIconSection}>
                      <View style={[
                        styles.moodEmojiContainer,
                        { backgroundColor: moodColors[track.mood] + '40' }
                      ]}>
                        <Text style={styles.trackMoodEmoji}>
                          {moodEmojis[track.mood]}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.trackDetails}>
                      <Text style={styles.trackMood}>
                        {track.mood.charAt(0).toUpperCase() + track.mood.slice(1)} Music
                      </Text>
                      <View style={styles.trackMetadata}>
                        <View style={[
                          styles.durationBadge,
                          { backgroundColor: moodColors[track.mood] + '30' }
                        ]}>
                          <Text style={styles.trackDuration}>
                            {track.duration}s
                          </Text>
                        </View>
                        <Text style={styles.trackTimestamp}>
                          {track.timestamp}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[
                      styles.playIconContainer, 
                      { backgroundColor: moodColors[track.mood] }
                    ]}>
                      <Text style={styles.playIcon}>
                        {playingTrackId === track.id ? '■' : '▶'}
                      </Text>
                    </View>
                  </View>
                  
                  {playingTrackId === track.id && (
                    <View style={styles.progressBarContainer}>
                      <View style={[
                        styles.progressFill, 
                        { 
                          width: `${progress * 100}%`,
                          backgroundColor: moodColors[track.mood]
                        }
                      ]} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F6FF',
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  moodScrollContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  moodButton: {
    backgroundColor: '#F7F9FC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  selectedMoodButton: {
    borderWidth: 2,
    transform: [{scale: 1.05}],
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  selectedMoodButtonText: {
    fontWeight: '700',
  },
  durationContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  durationValue: {
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: -10,
  },
  sliderLabel: {
    color: '#999',
    fontSize: 12,
  },
  generateButton: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  loadingText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#999',
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 10,
    color: '#CCCCCC',
  },
  noTracksText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyStateInstructions: {
    color: '#AAAAAA',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  tracksList: {
    flex: 1,
  },
  trackItem: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
    borderLeftWidth: 0,
  },
  playingTrackItem: {
    transform: [{scale: 1.02}],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 4,
  },
  trackContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  trackIconSection: {
    marginRight: 15,
  },
  moodEmojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackMoodEmoji: {
    fontSize: 20,
  },
  trackDetails: {
    flex: 1,
  },
  trackMood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  trackMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  trackDuration: {
    fontSize: 14,
    color: '#333',
  },
  trackTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  playIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
});

export default MusicGen;