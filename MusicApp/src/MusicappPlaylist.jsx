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



export default ArtistProfile;