import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const MusicPlaylistApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [likedTracks, setLikedTracks] = useState(new Set());

  const playlist = {
    title: "Summer Hits 2025",
    creator: "Music Waves",
    followers: "2.3M followers",
    coverImage: "https://via.placeholder.com/400",
    tracks: [
      { id: 1, title: "Sunshine Dance", artist: "Beach Waves", duration: "3:24", plays: "1.2M" },
      { id: 2, title: "Tropical Dreams", artist: "Island Vibes", duration: "4:15", plays: "892K" },
      { id: 3, title: "Summer Nights", artist: "Sunset Crew", duration: "3:45", plays: "2.1M" },
      { id: 4, title: "Ocean Breeze", artist: "Coastal", duration: "3:56", plays: "1.5M" },
      { id: 5, title: "Beach Party", artist: "Sandy Toes", duration: "4:02", plays: "956K" },
    ]
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleLike = (id) => {
    setLikedTracks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  const TrackItem = ({ track, index }) => (
    <TouchableOpacity
      style={[
        styles.trackItem,
        currentTrack === index && styles.currentTrack
      ]}
      onPress={() => setCurrentTrack(index)}
    >
      <Text style={styles.trackNumber}>{index + 1}</Text>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.trackArtist}>{track.artist}</Text>
      </View>
      <Text style={styles.trackPlays}>{track.plays}</Text>
      <TouchableOpacity onPress={() => toggleLike(track.id)}>
        <Ionicons
          name={likedTracks.has(track.id) ? "heart" : "heart-outline"}
          size={20}
          color={likedTracks.has(track.id) ? "#ff3b30" : "#8e8e93"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.header}
        >
          <Image
            source={{ uri: playlist.coverImage }}
            style={styles.coverImage}
          />
          <View style={styles.playlistInfo}>
            <Text style={styles.playlistTitle}>{playlist.title}</Text>
            <Text style={styles.playlistCreator}>{playlist.creator}</Text>
            <Text style={styles.playlistFollowers}>{playlist.followers}</Text>
          </View>
        </LinearGradient>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlay}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shuffleButton}>
            <Ionicons name="shuffle" size={24} color="#8e8e93" />
          </TouchableOpacity>
        </View>

        {/* Track List */}
        <View style={styles.trackList}>
          {playlist.tracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      {/* Playback Bar */}
      <View style={styles.playbackBar}>
        <Image
          source={{ uri: playlist.coverImage }}
          style={styles.miniCover}
        />
        <View style={styles.nowPlaying}>
          <Text style={styles.nowPlayingTitle}>
            {playlist.tracks[currentTrack].title}
          </Text>
          <Text style={styles.nowPlayingArtist}>
            {playlist.tracks[currentTrack].artist}
          </Text>
        </View>
        <View style={styles.playbackControls}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.miniPlayButton}
            onPress={togglePlay}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="#000000"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};