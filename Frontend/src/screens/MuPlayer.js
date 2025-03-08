// src/screens/MuPlayer.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerControls from '../components/PlayerControls';

const MuPlayer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Song Cover Image */}
      <Image source={require('../../assets/song-cover.jpg')} style={styles.cover} />

      {/* Song Title & Artist */}
      <Text style={styles.songTitle}>Perfect</Text>
      <Text style={styles.artist}>Ed Sheeran</Text>

      {/* Player Controls Component */}
      <PlayerControls />

      {/* Lyrics Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('LyPlayer')} 
        style={styles.lyricsButton}
        activeOpacity={0.8}
      >
        <Text style={styles.lyricsText}>Show Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#1E1E1E', 
    padding: 20 
  },
  cover: { 
    width: 250, 
    height: 250, 
    borderRadius: 12, 
    marginBottom: 20 
  },
  songTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 5 
  },
  artist: { 
    fontSize: 18, 
    color: '#B0B0B0', 
    marginBottom: 20 
  },
  lyricsButton: { 
    marginTop: 20, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    backgroundColor: '#ff8c00', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3 
  },
  lyricsText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default MuPlayer;
