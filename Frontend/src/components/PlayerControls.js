// src/components/PlayerControls.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.controls}>
      <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: { flexDirection: 'row', marginTop: 20 },
  button: { padding: 10, backgroundColor: '#ff8800', borderRadius: 5, marginHorizontal: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default PlayerControls;
