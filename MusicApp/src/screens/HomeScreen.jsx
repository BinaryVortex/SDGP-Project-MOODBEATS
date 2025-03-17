import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import theme from '../constants/theme';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient 
      colors={colors.backgroundGradient} 
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MusicApp</Text>
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to MusicApp</Text>
            <Text style={styles.welcomeText}>
              Discover, share, and enjoy music with our intelligent chatbot assistant.
            </Text>
            
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Text style={styles.chatButtonText}>Start Chatting</Text>
              <Ionicons name="chatbubble" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionTitle}>Features</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="musical-notes" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Music Discovery</Text>
              <Text style={styles.featureText}>
                Get personalized music recommendations based on your preferences.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="cloud-upload" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Share Audio</Text>
              <Text style={styles.featureText}>
                Upload and share your favorite music or recordings with the chatbot.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="image" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Image Recognition</Text>
              <Text style={styles.featureText}>
                Share images of artists, albums, or concert tickets for information.
              </Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.floatingButton}>
          <TouchableOpacity 
            style={styles.chatbotToggler}
            onPress={() => navigation.navigate('Chat')}
          >
            <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSizes.xl,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSizes.xl,
    color: '#000000',
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSizes.md,
    color: '#333333',
    marginBottom: 20,
    lineHeight: 22,
  },
  chatButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  chatButtonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSizes.md,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSizes.lg,
    color: '#000000',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSizes.md,
    color: '#000000',
    marginBottom: 4,
  },
  featureText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSizes.sm,
    color: '#666666',
    lineHeight: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  chatbotToggler: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;