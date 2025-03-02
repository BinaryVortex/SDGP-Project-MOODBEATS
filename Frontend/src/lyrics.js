import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const MusicPlayer = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(1);
  const [progress, setProgress] = useState(0);
  const lyricsScroll = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  // Play/Pause Function
  const togglePlayPause = async () => {
    if (!sound) {
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        require('./song.mp3'), // Replace with your audio file
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate(updateProgress);
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update Progress
  const updateProgress = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis);
      setTotalTime(status.durationMillis);
      setProgress(status.positionMillis / status.durationMillis);
      scrollLyrics(status.positionMillis / status.durationMillis);
    }
  };

  // Seek Function
  const seekTo = async (percentage) => {
    if (sound) {
      const newPosition = percentage * totalTime;
      await sound.setPositionAsync(newPosition);
    }
  };

  // Auto-scroll lyrics
  const scrollLyrics = (percentage) => {
    Animated.timing(lyricsScroll, {
      toValue: percentage * 150, // Adjust speed
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <TouchableOpacity
          style={styles.progressBarBackground}
          onPress={(e) => {
            const x = e.nativeEvent.locationX;
            const percentage = x / 300; // Adjust width if needed
            seekTo(percentage);
          }}
        >
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </TouchableOpacity>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{(currentTime / 1000).toFixed(2)}</Text>
          <Text style={styles.timeText}>{(totalTime / 1000).toFixed(2)}</Text>
        </View>
      </View>

      {/* Playback controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Additional controls */}
      <View style={styles.secondaryControls}>
        <TouchableOpacity>
          <Ionicons name="repeat" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#f87537" : "white"} />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons name="shuffle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Lyrics section with auto-scroll */}
      <View style={styles.lyricsContainer}>
        <Text style={styles.lyricsHeader}>Lyrics</Text>
        <Animated.ScrollView style={{ transform: [{ translateY: lyricsScroll }] }}>
          <Text style={styles.lyricHighlighted}>Barefoot on the grass,</Text>
          <Text style={styles.lyricHighlighted}>oh, listenin' to our</Text>
          <Text style={styles.lyricHighlighted}>favourite song</Text>
          <Text style={styles.lyric}>I have faith in what I</Text>
          <Text style={styles.lyric}>see, now I know I</Text>
          <Text style={styles.lyric}>have met</Text>
          <Text style={styles.lyric}>An angel in person,</Text>
          <Text style={styles.lyric}>and she looks perfect</Text>
          <Text style={styles.lyric} />
          <Text style={styles.lyric}>Though I don't</Text>
          <Text style={styles.lyric}>deserve this, you look</Text>
          <Text style={styles.lyric}>perfect tonight</Text>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  progressContainer: { marginBottom: 20 },
  progressBarBackground: { height: 4, backgroundColor: '#4d4d4d', borderRadius: 2, width: 300 },
  progressBar: { height: 4, backgroundColor: '#f87537', borderRadius: 2 },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeText: { color: 'white', fontSize: 12 },
  controls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  playButton: { backgroundColor: '#f87537', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  secondaryControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 20 },
  lyricsContainer: { flex: 1 },
  lyricsHeader: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  lyric: { color: 'white', fontSize: 16, lineHeight: 24 },
  lyricHighlighted: { color: '#f87537', fontSize: 16, lineHeight: 24 },
});

export default MusicPlayer;
