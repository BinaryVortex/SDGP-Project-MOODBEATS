import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LyricsPlayer = ({ route, navigation }) => {
  const { position: initialPosition, isPlaying: initialIsPlaying, song } = route.params;
  const [position, setPosition] = useState(initialPosition);
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);

  // Format time to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Update progress every second when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPosition((prev) => {
          if (prev >= song.duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, song.duration]);

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would control audio here
  };

  // Handle slider change
  const handleSliderChange = (value) => {
    setPosition(value);
    // In a real app, you would seek the audio here
  };

  // Check if a lyric should be highlighted based on current position
  const isLyricActive = (lyric) => {
    return position >= lyric.startTime && position <= lyric.endTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.playerControls}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(song.duration)}</Text>
        </View>
        
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={song.duration}
          value={position}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#800000"
          maximumTrackTintColor="#777"
          thumbTintColor="#800000"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={handlePlayPause}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.additionalControls}>
          <TouchableOpacity>
            <Ionicons name="repeat" size={22} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={22} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="shuffle" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lyricsContainer}>
        <Text style={styles.lyricsHeader}>Lyrics</Text>
        <ScrollView style={styles.scrollView}>
          {song.lyrics.map((lyric, index) => (
            <Text
              key={index}
              style={[
                styles.lyricText,
                isLyricActive(lyric) && styles.activeLyric,
              ]}
            >
              {lyric.line}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  playerControls: {
    marginTop: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#800080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  lyricsContainer: {
    flex: 1,
    marginTop: 20,
  },
  lyricsHeader: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
  },
  lyricText: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 20,
  },
  activeLyric: {
    color: '#800000',
    fontWeight: 'bold',
  },
});

export default LyricsPlayer;