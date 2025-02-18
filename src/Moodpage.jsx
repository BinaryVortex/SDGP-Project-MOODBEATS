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
  