import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import {  TextInput, FlatList, ScrollView } from 'react-native';

export default function MoodSelectionScreen() {
  const NavItem = ({ icon, label }) => (
    <TouchableOpacity style={styles.navItem}>
      <Feather name={icon} size={20} color="#bbb" />
      <Text style={styles.navLabel}>{label}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
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

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="smile-o" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="music" size={24} color="white" />
        </TouchableOpacity>

      </View>

      <View style={styles.navbar}>
        <NavItem icon="home" label="Home" />
        <NavItem icon="heart" label="Mood" />
        <NavItem icon="music" label="Playlist" />
      </View>
    </View>
    
  );
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: "#222",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 10,
    },
    title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      color: '#fff' 
    },

    navbar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#111', position: 'absolute', bottom: 0, width: '100%' },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 10, color: '#bbb', marginTop: 7 },
  
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
  
    section: {
       marginBottom: 60, 
       paddingHorizontal: 10 
      },
  container: { 
    flex: 1, 
    paddingTop: 40, 
    backgroundColor: "#000"
  },

  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    marginBottom: 35, 
  },

    optionText: {
      color: "white",
      marginTop: 10,
    },
    orText: {
      color: "white",
      marginVertical: 10,
      fontSize: 16,
    },
    emojiText: {
      fontSize: 24,
    },
    bottomNav: {
      position: "absolute",
      bottom: 20,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      paddingVertical: 10,
      backgroundColor: "#222",
    },
  });
  