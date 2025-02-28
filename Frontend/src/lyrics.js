import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState('3:47');
  const [totalTime, setTotalTime] = useState('4:19');
  const [progress, setProgress] = useState(0.65); // 65% of the way through the song

  // Toggle play/pause
  const togglePlayPause = () => setIsPlaying(!isPlaying);
  
  // Toggle like
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.timeText}>{totalTime}</Text>
        </View>
      </View>

      {/* Playback controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={30} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={togglePlayPause}
        >
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={30} 
            color="black" 
          />
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
        
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={24} 
            color={isLiked ? "#f87537" : "white"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <MaterialIcons name="shuffle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Lyrics section */}
      <View style={styles.lyricsContainer}>
        <Text style={styles.lyricsHeader}>Lyrics</Text>
        
        <View style={styles.lyricsContent}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};



export default MusicPlayer;