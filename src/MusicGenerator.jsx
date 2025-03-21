import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, GRADIENTS } from './constants/theme';

const MusicGenerator = () => {
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState(null);
  const [generationStep, setGenerationStep] = useState(0);

  const handleGenerate = () => {
    if (prompt.trim() === '') return;
    
    setIsGenerating(true);
    setGenerationStep(0);
    setGeneratedMusic(null);
    
    // Simulate a multi-step generation process
    const steps = [
      'Analyzing prompt...',
      'Generating melody...',
      'Adding harmonies...',
      'Adding rhythm section...',
      'Mastering audio...',
      'Finalizing your track...'
    ];
    
    // Advance through steps with delays to simulate processing
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      setGenerationStep(currentStep);
      
      if (currentStep >= steps.length) {
        clearInterval(stepInterval);
        
        // After all steps, simulate a completed track
        setTimeout(() => {
          setIsGenerating(false);
          setGeneratedMusic({
            title: `AI Generated: ${prompt.slice(0, 20)}${prompt.length > 20 ? '...' : ''}`,
            duration: '3:42',
            coverImage: 'https://via.placeholder.com/300'
          });
        }, 1000);
      }
    }, 1500);
  };

  const playGeneratedMusic = () => {
    navigation.navigate('Playlist', {
      screen: 'MusicPlayer',
      params: { 
        generatedTrack: generatedMusic,
        isAIGenerated: true
      }
    });
  };

  const renderGenerationProgress = () => {
    const steps = [
      'Analyzing prompt...',
      'Generating melody...',
      'Adding harmonies...',
      'Adding rhythm section...',
      'Mastering audio...',
      'Finalizing your track...'
    ];
    
    return (
      <View style={styles.progressContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        <Text style={styles.progressText}>{steps[generationStep]}</Text>
        <Text style={styles.progressSubtext}>This might take a moment...</Text>
      </View>
    );
  };

  const renderGeneratedMusic = () => {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.successText}>✓ Music Generated!</Text>
        
        <View style={styles.trackCard}>
          <Image 
            source={{ uri: generatedMusic.coverImage }} 
            style={styles.trackImage} 
          />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{generatedMusic.title}</Text>
            <Text style={styles.trackSubtitle}>AI Generated • {generatedMusic.duration}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={playGeneratedMusic}
        >
          <Ionicons name="play" size={24} color="white" />
          <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.generateAgainButton}
          onPress={() => setGeneratedMusic(null)}
        >
          <Text style={styles.generateAgainText}>Generate Another Track</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={GRADIENTS.main} style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Music Generator</Text>
          <View style={{ width: 24 }} /> {/* Empty space for alignment */}
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {!generatedMusic ? (
            <View style={styles.promptContainer}>
              <Text style={styles.title}>Generate AI Music</Text>
              <Text style={styles.subtitle}>
                Describe the music you want to create and our AI will generate it for you.
              </Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="E.g., 'A relaxing lo-fi beat with piano and rain sounds'"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={prompt}
                  onChangeText={setPrompt}
                  multiline
                  numberOfLines={4}
                  editable={!isGenerating}
                />
              </View>
              
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Suggestions:</Text>
                {['Upbeat pop song with catchy chorus', 'Ambient soundscape with nature sounds', 'Electronic dance track with strong bass'].map((suggestion, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.suggestionButton}
                    onPress={() => setPrompt(suggestion)}
                    disabled={isGenerating}
                  >
                    <Feather name="zap" size={14} color={COLORS.primary} />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <TouchableOpacity 
                style={[styles.generateButton, (!prompt.trim() || isGenerating) && styles.disabledButton]}
                onPress={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
              >
                {isGenerating ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Ionicons name="musical-notes" size={20} color="white" />
                    <Text style={styles.generateButtonText}>Generate Music</Text>
                  </>
                )}
              </TouchableOpacity>
              
              {isGenerating && renderGenerationProgress()}
            </View>
          ) : (
            renderGeneratedMusic()
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  promptContainer: {
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  input: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  suggestionsContainer: {
    marginBottom: 30,
  },
  suggestionsTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  suggestionText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(128, 0, 128, 0.5)',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    color: COLORS.success,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trackSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  generateAgainButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  generateAgainText: {
    color: COLORS.primary,
    fontSize: 16,
  }
});

export default MusicGenerator;