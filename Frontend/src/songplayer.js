import React, { useState } from 'react';
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
              { width: (currentTime / totalTime) * 100 + "%" },
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


