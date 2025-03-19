import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SongDisplay = ({ song, onPress, isPlaying }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={song.albumArt} style={styles.albumArt} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      
      <TouchableOpacity style={styles.playButton}>
        <Ionicons 
          name={isPlaying ? "pause" : "play"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 10,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#800000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SongDisplay; 