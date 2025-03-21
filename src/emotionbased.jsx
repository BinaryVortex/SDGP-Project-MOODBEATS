import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './constants/theme';
import song from './song';

const EmotionBased = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [emotion, setEmotion] = useState('romantic');
  const [recommendations, setRecommendations] = useState([]);

  // Analyze lyrics to determine emotional content
  const analyzeEmotion = (lyrics) => {
    // This is a simplified emotion detection algorithm
    // In a real app, you would use NLP or machine learning
    const romanticWords = ['love', 'heart', 'perfect', 'beautiful', 'angel'];
    const sadWords = ['cry', 'tears', 'pain', 'goodbye', 'lost'];
    const happyWords = ['happy', 'joy', 'dance', 'smile', 'sun'];
    
    let romanticCount = 0;
    let sadCount = 0;
    let happyCount = 0;
    
    lyrics.forEach(lyric => {
      const line = lyric.line.toLowerCase();
      
      romanticWords.forEach(word => {
        if (line.includes(word)) romanticCount++;
      });
      
      sadWords.forEach(word => {
        if (line.includes(word)) sadCount++;
      });
      
      happyWords.forEach(word => {
        if (line.includes(word)) happyCount++;
      });
    });
    
    if (romanticCount > sadCount && romanticCount > happyCount) {
      return 'romantic';
    } else if (sadCount > romanticCount && sadCount > happyCount) {
      return 'sad';
    } else if (happyCount > romanticCount && happyCount > sadCount) {
      return 'happy';
    } else {
      return 'neutral';
    }
  };

  // Get similar song recommendations based on emotion
  const getRecommendations = (emotion) => {
    // In a real app, this would come from an API
    const recommendations = {
      romantic: [
        { id: 1, title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
        { id: 2, title: 'All of Me', artist: 'John Legend' },
        { id: 3, title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley' },
      ],
      sad: [
        { id: 4, title: 'Someone Like You', artist: 'Adele' },
        { id: 5, title: 'Fix You', artist: 'Coldplay' },
        { id: 6, title: 'Hurt', artist: 'Johnny Cash' },
      ],
      happy: [
        { id: 7, title: 'Happy', artist: 'Pharrell Williams' },
        { id: 8, title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
        { id: 9, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
      ],
      neutral: [
        { id: 10, title: 'Viva la Vida', artist: 'Coldplay' },
        { id: 11, title: 'Believer', artist: 'Imagine Dragons' },
        { id: 12, title: 'High Hopes', artist: 'Panic! At The Disco' },
      ],
    };
    
    return recommendations[emotion] || [];
  };

  useEffect(() => {
    // Analyze song emotion when component mounts
    const detectedEmotion = analyzeEmotion(song.lyrics);
    setEmotion(detectedEmotion);
    
    // Get recommendations based on emotion
    const songRecommendations = getRecommendations(detectedEmotion);
    setRecommendations(songRecommendations);
  }, []);

  const navigateToSong = (songId) => {
    navigation.navigate('MusicPlayer', { trackId: songId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emotion Analysis</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>
      
      <ScrollView>
        <View style={styles.emotionContainer}>
          <Text style={styles.label}>Current Song Mood:</Text>
          <Text style={styles.emotion}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</Text>
        </View>
        
        <View style={styles.recommendationsContainer}>
          <Text style={styles.label}>Similar Songs:</Text>
          {recommendations.map((recommendation) => (
            <TouchableOpacity 
              key={recommendation.id} 
              style={styles.recommendationItem}
              onPress={() => navigateToSong(recommendation.id)}
            >
              <View>
                <Text style={styles.songTitle}>{recommendation.title}</Text>
                <Text style={styles.artistName}>{recommendation.artist}</Text>
              </View>
              <Ionicons name="play-circle-outline" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  emotionContainer: {
    backgroundColor: COLORS.backgroundMedium,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 10,
  },
  emotion: {
    color: COLORS.primaryLight,
    fontSize: 24,
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    backgroundColor: COLORS.backgroundMedium,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  recommendationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  songTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
});

export default EmotionBased;