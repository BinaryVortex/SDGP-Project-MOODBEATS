import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

// API URL - Change this to match your backend URL
const API_URL = 'http://192.168.1.6:8000/generate-music/';

const MusicGen = () => {
  const [mood, setMood] = useState('happy');
  const [duration, setDuration] = useState(15);
  const [generatedTracks, setGeneratedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState();
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Clean up sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Function to generate music
  const generateMusic = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.6:8000/generate-music/", {
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
      
      // Add new track to the list
      const newTrack = {
        id: Date.now().toString(),
        filePath: data.file_path,
        mood: data.mood,
        duration: data.duration,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setGeneratedTracks(prevTracks => [newTrack, ...prevTracks]);
      
      Alert.alert(
        'Success',
        `Generated ${data.mood} music for ${data.duration} seconds!`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error generating music:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to play the audio
  const playSound = async (trackId, filePath) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      
      if (playingTrackId === trackId) {
        setPlayingTrackId(null);
        return;
      }
    }
  
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.1.6:8000/audio/${filePath}` }, // Adjust the URL if needed
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setPlayingTrackId(trackId);
      setIsPlaying(true);
  
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlayingTrackId(null);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to play the audio file');
      console.error('Error playing sound:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MusicGen</Text>
      <Text style={styles.subtitle}>Generate mood-based music</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Mood:</Text>
        <View style={styles.moodContainer}>
          {['happy', 'sad', 'relaxed', 'energetic'].map((moodOption) => (
            <TouchableOpacity
              key={moodOption}
              style={[
                styles.moodButton,
                mood === moodOption && styles.selectedMoodButton,
              ]}
              onPress={() => setMood(moodOption)}
            >
              <Text
                style={[
                  styles.moodButtonText,
                  mood === moodOption && styles.selectedMoodButtonText,
                ]}
              >
                {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Duration: {duration} seconds
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={60}
          step={1}
          value={duration}
          onValueChange={setDuration}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#4A90E2"
        />

        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateMusic}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Music</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Generated Tracks</Text>
        {generatedTracks.length === 0 ? (
          <Text style={styles.noTracksText}>No tracks generated yet</Text>
        ) : (
          <ScrollView style={styles.tracksList}>
            {generatedTracks.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={[
                  styles.trackItem,
                  playingTrackId === track.id && styles.playingTrackItem,
                ]}
                onPress={() => playSound(track.id, track.filePath)}
              >
                <View style={styles.trackDetails}>
                  <Text style={styles.trackMood}>
                    {track.mood.charAt(0).toUpperCase() + track.mood.slice(1)}
                  </Text>
                  <Text style={styles.trackDuration}>{track.duration}s</Text>
                </View>
                <View style={styles.trackMetadata}>
                  <Text style={styles.trackTimestamp}>{track.timestamp}</Text>
                  <View style={styles.playIconContainer}>
                    <Text style={styles.playIcon}>
                      {playingTrackId === track.id && isPlaying ? '■' : '▶'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedMoodButton: {
    backgroundColor: '#4A90E2',
  },
  moodButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedMoodButtonText: {
    color: '#FFFFFF',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  noTracksText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  tracksList: {
    flex: 1,
  },
  trackItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playingTrackItem: {
    backgroundColor: '#E6F0FB',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  trackDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackMood: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 10,
  },
  trackDuration: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trackMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackTimestamp: {
    fontSize: 12,
    color: '#999',
    marginRight: 10,
  },
  playIconContainer: {
    backgroundColor: '#4A90E2',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default MusicGen;