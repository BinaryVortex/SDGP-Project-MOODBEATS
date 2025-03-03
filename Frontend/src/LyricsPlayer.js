import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LyricsPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Sample lyrics with highlighted parts (first line)
  const lyrics = [
    { text: "Barefoot on the grass, oh, listenin' to our favourite song", highlighted: true },
    { text: "I have faith in what I see, now I know I have met", highlighted: false },
    { text: "An angel in person, and she looks perfect", highlighted: false },
    { text: "Though I don't deserve this, you look perfect tonight", highlighted: false },
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>3:47</Text>
          <Text style={styles.timeText}>4:19</Text>
        </View>
      </View>

      {/* Playback controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={28} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          {isPlaying ? (
            <Ionicons name="pause" size={28} color="white" />
          ) : (
            <Ionicons name="play" size={28} color="white" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Secondary controls */}
      <View style={styles.secondaryControls}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="repeat" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={toggleFavorite}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Lyrics section */}
      <View style={styles.lyricsContainer}>
        <Text style={styles.lyricsTitle}>Lyrics</Text>
        
        <View style={styles.lyricsContent}>
          {lyrics.map((line, index) => (
            <Text 
              key={index} 
              style={[
                styles.lyricLine, 
                line.highlighted && styles.highlightedLyric
              ]}
            >
              {line.text}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  menuButton: {
    padding: 5,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
  },
  progress: {
    width: '65%',
    height: '100%',
    backgroundColor: '#e65c00',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    padding: 15,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e65c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  secondaryButton: {
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  lyricsContainer: {
    flex: 1,
  },
  lyricsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lyricsContent: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
  },
  lyricLine: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  highlightedLyric: {
    color: '#e65c00',
  },
});

export default LyricsPlayer;