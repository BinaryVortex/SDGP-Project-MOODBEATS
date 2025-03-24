import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  
  // Pulse animation for the visualizer bars
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(0.7)).current;
  const pulse3 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Start pulse animations for the audio visualizer effect
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulse1, { toValue: 0.4, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse2, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse3, { toValue: 0.7, duration: 800, useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(pulse1, { toValue: 0.7, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse2, { toValue: 0.4, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse3, { toValue: 1, duration: 800, useNativeDriver: true })
        ]),
        Animated.parallel([
          Animated.timing(pulse1, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse2, { toValue: 0.7, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse3, { toValue: 0.4, duration: 800, useNativeDriver: true })
        ])
      ])
    ).start();

    // Start main splash screen animations
    Animated.sequence([
      // Logo appears with bouncy effect
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      
      // Text fades in
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      
      // Wait a moment to display splash screen
      Animated.delay(1800),
      
      // Fade everything out
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Set timer to navigate to the home page
    const navigationTimer = setTimeout(() => {
      // Navigate to main app after splash animation
      // Replace 'Home' with your actual home screen name
      navigation.replace('Home');
    }, 3500); // Total animation time + a small buffer

    // Clear the timer if component unmounts
    return () => clearTimeout(navigationTimer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Improved background with better gradient simulation */}
      <View style={styles.background} />
      
      <Animated.View style={[
        styles.logoContainer,
        {
          opacity: fadeOut,
          transform: [{ scale: logoScale }]
        }
      ]}>
        {/* Musical note icon */}
        <View style={styles.noteContainer}>
          <View style={styles.noteStem} />
          <View style={styles.noteHead} />
          <View style={styles.noteFlair} />
        </View>
        
        {/* Animated wave visualization effect */}
        <View style={styles.visualizer}>
          <Animated.View style={[styles.bar, { height: 40, transform: [{ scaleY: pulse1 }] }]} />
          <Animated.View style={[styles.bar, { height: 40, transform: [{ scaleY: pulse2 }] }]} />
          <Animated.View style={[styles.bar, { height: 40, transform: [{ scaleY: pulse3 }] }]} />
          <Animated.View style={[styles.bar, { height: 40, transform: [{ scaleY: pulse2 }] }]} />
          <Animated.View style={[styles.bar, { height: 40, transform: [{ scaleY: pulse1 }] }]} />
        </View>
      </Animated.View>
      
      <Animated.View style={[
        styles.textContainer,
        {
          opacity: Animated.multiply(fadeIn, fadeOut)
        }
      ]}>
        <Text style={styles.title}>MoodBeats</Text>
        <Text style={styles.tagline}>Music for every mood</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    noteContainer: {
      width: 100,
      height: 140,
      marginBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noteStem: {
      position: 'absolute',
      right: 25,
      top: 10,
      width: 8,
      height: 100,
      backgroundColor: '#9B51E0', // Soft vibrant purple
      borderRadius: 4,
      shadowColor: '#9B51E0', // Subtle glow
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    noteHead: {
      position: 'absolute',
      right: 10,
      bottom: 30,
      width: 40,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#9B51E0', // Soft vibrant purple
      transform: [{ rotate: '10deg' }],
      shadowColor: '#9B51E0', // Subtle glow
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    noteFlair: {
      position: 'absolute',
      right: 40,
      bottom: 40,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#9B51E0', // White accent
      opacity: 0.8,
    },
    visualizer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      height: 60,
      width: 220,
      marginTop: 20,
    },
    bar: {
      width: 8,
      marginHorizontal: 4,
      backgroundColor: '#9B51E0', // Soft vibrant purple
      borderRadius: 4,
      shadowColor: '#9B51E0', // Subtle glow
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    textContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#333333', // Dark gray for readability
      letterSpacing: 2,
      textShadowColor: 'rgba(155, 81, 224, 0.3)', // Soft purple shadow
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    tagline: {
      fontSize: 20,
      fontWeight: '300',
      color: '#666666', // Medium gray for subtlety
      marginTop: 10,
      letterSpacing: 1,
    },
  });

export default SplashScreen;