import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Song Item Component
const SongItem = ({ title, artist, imageUrl, isPlaying }) => {
  return (
    <View style={styles.songItem}>
      <Image source={{ uri: imageUrl }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.songArtist}>{artist}</Text>
      </View>
      {isPlaying && <View style={styles.playingIndicator} />}
      <TouchableOpacity style={styles.songMenuButton}>
        <Text style={styles.menuIcon}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
};

const ArtistProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Artist Profile */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-07%20101520-4KRSFaX0sR0GvOfN8byUTMnadcLLHU.png",
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.artistName}>Ariana Grande</Text>
          <Text style={styles.artistStats}>Songs: 158 | Albums: 6 | Playlists: 5</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
        </View>

        {/* Songs Section */}
        <View style={styles.songsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Songs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Song List */}
          <SongItem
            title="Bloodline"
            artist="Ariana Grande"
            imageUrl="https://via.placeholder.com/60"
            isPlaying={false}
          />
          <SongItem
            title="The Light is Coming"
            artist="Ariana Grande"
            imageUrl="https://via.placeholder.com/60"
            isPlaying={true}
          />
          <SongItem
            title="Dangerous Woman"
            artist="Ariana Grande"
            imageUrl="https://via.placeholder.com/60"
            isPlaying={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: "white",
    fontSize: 24,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    color: "white",
    fontSize: 24,
  },
  profileContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: width - 80,
    height: width - 80,
    borderRadius: 10,
    marginBottom: 20,
  },
  artistName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  artistStats: {
    color: "#999",
    fontSize: 14,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  playButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 3,
    backgroundColor: "#333",
    borderRadius: 3,
  },
  progress: {
    width: "30%",
    height: "100%",
    backgroundColor: "#FF6B00",
    borderRadius: 3,
  },

}
export default ArtistProfile;