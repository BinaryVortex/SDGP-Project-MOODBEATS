import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import song from './song';

const EmotionBased = ({ navigation }) => {
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
        { title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
        { title: 'All of Me', artist: 'John Legend' },
        { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley' },
      ],
      sad: [
        { title: 'Someone Like You', artist: 'Adele' },
        { title: 'Fix You', artist: 'Coldplay' },
        { title: 'Hurt', artist: 'Johnny Cash' },
      ],
      happy: [
        { title: 'Happy', artist: 'Pharrell Williams' },
        { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
      ],
      neutral: [
        { title: 'Viva la Vida', artist: 'Coldplay' },
        { title: 'Believer', artist: 'Imagine Dragons' },
        { title: 'High Hopes', artist: 'Panic! At The Disco' },
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emotion Analysis</Text>
      
      <View style={styles.emotionContainer}>
        <Text style={styles.label}>Current Song Mood:</Text>
        <Text style={styles.emotion}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</Text>
      </View>
      
      <View style={styles.recommendationsContainer}>
        <Text style={styles.label}>Similar Songs:</Text>
        {recommendations.map((recommendation, index) => (
          <TouchableOpacity key={index} style={styles.recommendationItem}>
            <Text style={styles.songTitle}>{recommendation.title}</Text>
            <Text style={styles.artistName}>{recommendation.artist}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  emotionContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 10,
  },
  emotion: {
    color: '#800000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  recommendationItem: {
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
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
});

export default EmotionBased;