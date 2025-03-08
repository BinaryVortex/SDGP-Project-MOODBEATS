// src/components/SongCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SongCard = ({ title, artist, cover }) => {
  return (
    <View style={styles.card}>
      <Image source={cover} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#222', marginBottom: 10, borderRadius: 10 },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  title: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  artist: { fontSize: 14, color: 'gray' },
});

export default SongCard;
