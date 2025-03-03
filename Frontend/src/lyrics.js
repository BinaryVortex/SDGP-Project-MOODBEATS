import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Home() {
  return <MusicPlayerPreview />;
}

const MusicPlayerPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentTime, setCurrentTime] = useState(227); // 3:47 in seconds
  const [totalTime] = useState(263); // 4:23 in seconds

  const progressAnim = new Animated.Value((currentTime / totalTime) * 100);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Toggle Play/Pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle Favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Update progress every second when playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < totalTime) {
        setCurrentTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);

  // Animate the progress bar width
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentTime / totalTime) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentTime]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>iPhone 16 Plus - 8</Text>
        <TouchableOpacity>
          <Icon name="more-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Album Cover */}
      <View style={styles.albumArt}>
        <Text style={styles.albumText}>ED SHEERAN</Text>
        <Text style={styles.songTitle}>Perfect</Text>
      </View>

      {/* Song Info */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>Perfect</Text>
        <Text style={styles.artist}>Ed Sheeran</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
            ]}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Icon name="skip-back" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="skip-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity>
          <Icon name="shuffle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon name="heart" size={24} color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  albumArt: {
    width: 250,
    height: 250,
    backgroundColor: '#4287f5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  songTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  artist: {
    color: 'gray',
    fontSize: 16,
    marginTop: 5,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    width: '90%',
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#555',
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#ff5733',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  playButton: {
    width: 75,
    height: 75,
    backgroundColor: '#ff5733',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
});
