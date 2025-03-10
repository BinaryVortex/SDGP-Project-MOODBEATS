// src/screens/MuPlayer.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerControls from '../components/PlayerControls';

const MuPlayer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/song-cover.jpg')} style={styles.cover} />
      <Text style={styles.songTitle}>Perfect</Text>
      <Text style={styles.artist}>Ed Sheeran</Text>

      <PlayerControls />

      <TouchableOpacity onPress={() => navigation.navigate('LyPlayer')} style={styles.lyricsButton}>
        <Text style={styles.lyricsText}>Show Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  cover: { width: 250, height: 250, borderRadius: 10 },
  songTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 20 },
  artist: { fontSize: 18, color: 'gray', marginBottom: 20 },
  lyricsButton: { marginTop: 20, padding: 10, backgroundColor: '#ff8800', borderRadius: 5 },
  lyricsText: { color: 'white', fontWeight: 'bold' },
});

export default MuPlayer;
