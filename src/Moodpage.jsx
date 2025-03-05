import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MoodSelectionScreen() {
  const [scrollY] = useState(new Animated.Value(0));

  const NavItem = ({ icon, label, color }) => (
    <TouchableOpacity style={styles.navItem}>
      <Feather name={icon} size={20} color={color || "#bbb"} />
      <Text style={[styles.navLabel, { color: color || "#bbb" }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['black', '#3b85ed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MOODBEATS</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Search" placeholderTextColor="#aaa" style={styles.searchInput} />
          </View>
        </View>

        <Text style={styles.title}>Which option would you prefer?</Text>

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

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.emojiText}>😊 😢 😐 😡 😴</Text>
          <Text style={styles.optionText}>Current Mood</Text>
        </TouchableOpacity>
      </Animated.ScrollView>

      <View style={styles.navbar}>
        <NavItem icon="home" label="Home" color="white" />
        <NavItem icon="heart" label="Mood" color="white" />
        <NavItem icon="music" label="Playlists" color="white" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 150
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    color: '#fff',
    fontSize: 14,
    flex: 1
  },
  optionButton: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  optionText: {
    color: "white",
    marginTop: 10,
  },
  emojiText: {
    fontSize: 24,
  },
  orText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
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
