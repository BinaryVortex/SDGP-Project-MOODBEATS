// src/screens/LyPlayer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LyPlayer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.lyricsTitle}>Lyrics</Text>
      <Text style={styles.lyricsText}>
        Barefoot on the grass, oh, listenin' to our favorite song...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  backText: { fontSize: 18, color: '#ff8800' },
  lyricsTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  lyricsText: { fontSize: 18, color: 'white', textAlign: 'center' },
});

export default LyPlayer;
