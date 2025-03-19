import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native';

const API_URL = 'https://ngrok.com/new-features-update?ref=private';

const MusicGenerator = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState(null);

  // List of moods from your API
  const moods = [
    { id: 'happy', name: 'Happy', emoji: '😊', color: '#DCFCE7' },
    { id: 'sad', name: 'Sad', emoji: '😢', color: '#EFF6FF' },
    { id: 'relaxed', name: 'Relaxed', emoji: '😌', color: '#F0FDF4' },
    { id: 'energetic', name: 'Energetic', emoji: '⚡', color: '#ECFDF5' },
    { id: 'angry', name: 'Angry', emoji: '😠', color: '#FEF2F2' },
    { id: 'neutral', name: 'Neutral', emoji: '😐', color: '#F8FAFC' }
  ];

  const generateMusic = async () => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    
    try {
      // Call your API
      const response = await fetch(`${API_URL}/generate-music`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          intensity: 0.7 // Using a fixed intensity for simplicity
        }),
      });
      
      const data = await response.json();
      setGeneratedTrack(data);
      
    } catch (error) {
      console.error('Error generating music:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>MOODBEATS</Text>
        <Text style={styles.tagline}>Music that matches how you feel</Text>
      </View>
      
      <View style={styles.moodSelectorContainer}>
        <Text style={styles.promptText}>How are you feeling today?</Text>
        
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                { backgroundColor: mood.color },
                selectedMood === mood.id && styles.selectedMoodCard
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.emojiText}>{mood.emoji}</Text>
              <Text style={styles.moodText}>{mood.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.generateButton,
          !selectedMood && styles.disabledButton
        ]}
        onPress={generateMusic}
        disabled={!selectedMood || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.generateButtonText}>Generate Music</Text>
        )}
      </TouchableOpacity>
      
      {generatedTrack && (
        <View style={styles.playerCard}>
          <View style={styles.trackInfoRow}>
            <View style={[styles.albumArt, { backgroundColor: moods.find(m => m.id === selectedMood)?.color }]}>
              <Text style={styles.albumEmoji}>{moods.find(m => m.id === selectedMood)?.emoji}</Text>
            </View>
            
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Melody</Text>
              <Text style={styles.trackSubtitle}>
                {generatedTrack.parameters.key} {generatedTrack.parameters.scale} • {generatedTrack.parameters.bpm} BPM
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          
          <Text style={styles.instrumentsText}>
            Instruments: {generatedTrack.parameters.instruments.join(', ')}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#800080',
  },
  tagline: {
    fontSize: 14,
    color: '#64748B',
  },
  moodSelectorContainer: {
    padding: 20,
  },
  promptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#334155',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedMoodCard: {
    borderWidth: 2,
    borderColor: '#ad0aad',
  },
  emojiText: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  generateButton: {
    backgroundColor: '#800080',
    marginHorizontal: 20,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerCard: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trackInfoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  albumArt: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  albumEmoji: {
    fontSize: 40,
  },
  trackInfo: {
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  trackSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  playButton: {
    backgroundColor: '#800080',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instrumentsText: {
    fontSize: 14,
    color: '#64748B',
  }
});

export default MusicGenerator;