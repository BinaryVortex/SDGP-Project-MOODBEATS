import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Animated,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MoodSelectionScreen({ navigation }) {
  const [scrollY] = useState(new Animated.Value(0));
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  
  // Animation values for button color and brightness
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  
  // Interpolate animation value to color
  const buttonBackgroundColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#800080', '#FF00FF']
  });
  
  // Brightness/scale effect
  const buttonScale = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05]
  });

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(buttonColorAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleEmojiPress = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleContinue = () => {
    // Handle continue action
    console.log('Continue with selected mood:', selectedEmoji);
  };

  const NavItem = ({ icon, label, color }) => (
    <TouchableOpacity style={styles.navItem}>
      <Feather name={icon} size={20} color={color || "#bbb"} />
      <Text style={[styles.navLabel, { color: color || "#bbb" }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['black', '#800080', 'black']}
        locations={[0, 0.6, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <View style={styles.header}>
            <Text style={styles.logoText}>MOODBEATS</Text>
            <View style={styles.searchContainer}>
              <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
              <TextInput placeholder="Search" placeholderTextColor="#aaa" style={styles.searchInput} />
            </View>
          </View>

          <Text style={styles.title}>Which option would you prefer?😊</Text>

          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="camera" size={50} color="white" />
            <Text style={styles.optionText}>Face Detection</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="microphone" size={50} color="white" />
            <Text style={styles.optionText}>Voice Detection</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          <View style={styles.moodContainer}>
            <Text style={styles.moodTitle}>Select your current mood:</Text>
            <View style={styles.emojiContainer}>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "😊" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("😊")}
              >
                <Text style={styles.emojiText}>😊</Text>
                <Text style={styles.emojiLabel}>Happy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "😢" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("😢")}
              >
                <Text style={styles.emojiText}>😢</Text>
                <Text style={styles.emojiLabel}>Sad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "😐" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("😐")}
              >
                <Text style={styles.emojiText}>😐</Text>
                <Text style={styles.emojiLabel}>Neutral</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.emojiContainer}>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "😡" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("😡")}
              >
                <Text style={styles.emojiText}>😡</Text>
                <Text style={styles.emojiLabel}>Angry</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "😴" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("😴")}
              >
                <Text style={styles.emojiText}>😴</Text>
                <Text style={styles.emojiLabel}>Sleepy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.emojiButton, selectedEmoji === "🤩" && styles.selectedEmoji]}
                onPress={() => handleEmojiPress("🤩")}
              >
                <Text style={styles.emojiText}>🤩</Text>
                <Text style={styles.emojiLabel}>Excited</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button with Enhanced Animation */}
          {selectedEmoji && (
            <Animated.View style={{
              shadowColor: '#FF00FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: buttonColorAnim,
              shadowRadius: 10,
              transform: [{ scale: buttonScale }],
              marginTop: 30,
            }}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleContinue}
              >
                <Animated.View style={[
                  styles.continueButton,
                  { 
                    backgroundColor: buttonBackgroundColor,
                  }
                ]}>
                  <LinearGradient
                    colors={isPressed ? 
                      ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)'] : 
                      ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                    style={styles.buttonGradient}
                  >
                    <Animated.Text style={[
                      styles.continueText,
                      { 
                        color: isPressed ? '#FFFFFF' : '#F0F0F0',
                        textShadowColor: 'rgba(255,255,255,0.5)',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: isPressed ? 10 : 0,
                      }
                    ]}>Continue</Animated.Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.ScrollView>

        {/* Bottom Navigation Bar - Exact copy from MusicPlaylistApp */}
        <View style={styles.navbar}>
          <NavItem icon="home" label="Home" color="white" />
          <NavItem icon="heart" label="Mood" color="#FF00FF" />
          <NavItem icon="music" label="Playlists" color="white" />
          <NavItem icon="user" label="Profile" color="white" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center",
    marginBottom: 30,
  },
  moodTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 10,
    width: 144,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  optionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  optionText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  moodContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  emojiButton: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedEmoji: {
    backgroundColor: 'rgba(255, 0, 255, 0.3)',
    borderColor: '#FF00FF',
  },
  emojiText: {
    fontSize: 30,
    marginBottom: 5,
  },
  emojiLabel: {
    color: 'white',
    fontSize: 12,
  },
  orText: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    marginVertical: 10,
  },
  continueButton: {
    width: '90%',
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'center',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#bbb',
    marginTop: 7,
  },
});