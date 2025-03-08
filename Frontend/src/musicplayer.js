import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const MusicPlayer = () => {
  const [showLyrics, setShowLyrics] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('3:47');
  const [totalDuration, setTotalDuration] = useState('4:23');
  const [progress, setProgress] = useState(0.7);

  // Sample song data
  const song = {
    title: "Perfect",
    artist: "Ed Sheeran",
    coverArt: "https://example.com/perfect.jpg", // Replace with actual image path
    lyrics: [
      "Barefoot on the grass,",
      "oh, listenin' to our",
      "favourite song",
      "I have faith in what I",
      "see, now I know I",
      "have met",
      "An angel in person,",
      "and she looks perfect",
      "",
      "Though I don't",
      "deserve this, you look",
      "perfect tonight"
    ]
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Placeholder function for seeking
  const handleSeek = (value) => {
    // Implement seeking functionality
    console.log('Seek to:', value);
  };

  return (
    <View style={styles.container}>
      {!showLyrics ? (
        // Main player view
        <View style={styles.playerContainer}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.albumArtContainer}>
            <Image 
              source={{ uri: song.coverArt }}
              style={styles.albumArt}
              defaultSource={require('./assets/default-album.png')} // Add a default placeholder
            />
          </View>

          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.artistName}>{song.artist}</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{currentTime}</Text>
              <Text style={styles.timeText}>{totalDuration}</Text>
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity>
              <Ionicons name="play-skip-back" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
                style={{ marginLeft: isPlaying ? 0 : 4 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-forward" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.additionalControlsContainer}>
            <TouchableOpacity>
              <Ionicons name="repeat" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="shuffle" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.lyricsButton} onPress={toggleLyrics}>
            <Text style={styles.lyricsButtonText}>Lyrics</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Lyrics view
        <View style={styles.lyricsContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleLyrics}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{currentTime}</Text>
              <Text style={styles.timeText}>{totalDuration}</Text>
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity>
              <Ionicons name="play-skip-back" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
                style={{ marginLeft: isPlaying ? 0 : 4 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-forward" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.additionalControlsContainer}>
            <TouchableOpacity>
              <Ionicons name="repeat" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="shuffle" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.lyricsHeader}>Lyrics</Text>
          
          <ScrollView style={styles.lyricsScrollView}>
            <View style={styles.lyricsTextContainer}>
              {song.lyrics.map((line, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.lyricsText,
                    // Highlight current line (this would be dynamic in a real app)
                    index >= 0 && index <= 8 ? styles.activeLyrics : {}
                  ]}
                >
                  {line}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  playerContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 8,
  },
  songInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  songTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artistName: {
    color: 'white',
    fontSize: 18,
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4f4f4f',
    borderRadius: 2,
  },
  progress: {
    height: 4,
    backgroundColor: '#e67e22',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    color: '#9f9f9f',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
  },
  playButton: {
    backgroundColor: '#e67e22',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
  },
  lyricsButton: {
    alignItems: 'center',
  },
  lyricsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  lyricsContainer: {
    flex: 1,
    padding: 20,
  },
  lyricsHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lyricsScrollView: {
    flex: 1,
  },
  lyricsTextContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
  },
  lyricsText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  activeLyrics: {
    color: '#e67e22',
  },
});

export default MusicPlayer;