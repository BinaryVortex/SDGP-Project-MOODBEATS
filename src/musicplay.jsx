import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import song from './song';
import { COLORS } from './constants/theme';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trackId, trackIndex } = route.params || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Format time to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Load sound when component mounts
    const loadSound = async () => {
      try {
        // Note: In a real app, you would use song.audioFile
        // This is just for demonstration - no actual audio will play
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/placeholder.mp3'),
          { shouldPlay: false }
        );
        setSound(sound);
        setIsLoaded(true);
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };

    loadSound();

    // Clean up
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Play or pause sound
  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
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
  }, [isPlaying]);

  // Handle slider change
  const handleSliderChange = (value) => {
    setPosition(value);
    if (sound) {
      sound.setPositionAsync(value * 1000);
    }
  };

  // Navigate to lyrics screen
  const navigateToLyrics = () => {
    navigation.navigate('LyricsPlayer', {
      position,
      isPlaying,
      song,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.albumContainer}>
        <Image source={song.albumArt} style={styles.albumArt} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artistName}>{song.artist}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={song.duration}
            value={position}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor="#777"
            thumbTintColor={COLORS.primaryLight}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(song.duration)}</Text>
          </View>
        </View>

        <View style={styles.playerControls}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={36} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={36}
              color="white"
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.additionalControls}>
          <TouchableOpacity>
            <Ionicons name="repeat" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="shuffle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.lyricsButton}
          onPress={navigateToLyrics}
        >
          <Text style={styles.lyricsText}>Lyrics</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  albumContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  songTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 5,
  },
  controlsContainer: {
    marginTop: 30,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -15,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  lyricsButton: {
    alignItems: 'center',
    marginTop: 30,
  },
  lyricsText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MusicPlayer;