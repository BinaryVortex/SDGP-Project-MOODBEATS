import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function MoodSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which option would you prefer?</Text>
      
      <TouchableOpacity style={styles.optionButton}>
        <FontAwesome name="camera" size={50} color="white" />
        <Text style={styles.optionText}>Face Recognition</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>Or</Text>
      
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.emojiText}>😊 😢 😐 😡 😴</Text>
        <Text style={styles.optionText}>Mood selection interface</Text>
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
    </View>
  );
}
