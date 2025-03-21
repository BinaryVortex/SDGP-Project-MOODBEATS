import React, { useState, useEffect } from 'react';
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
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from './constants/theme';

const { width } = Dimensions.get('window');

const MusicPlaylistApp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mood } = route.params || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  
  // Playlist could be modified based on mood parameter
  const [playlist, setPlaylist] = useState({
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
  });

  // Update playlist based on mood
  useEffect(() => {
    if (mood) {
      // In a real app, you would fetch mood-based playlists from an API
      let playlistTitle = "Default Playlist";
      switch(mood) {
        case 'happy':
        case '😊':
          playlistTitle = "Happy Vibes";
          break;
        case 'sad':
        case '😢':
          playlistTitle = "Melancholy Tunes";
          break;
        case 'relaxed':
        case '😌':
          playlistTitle = "Chill Session";
          break;
        case 'angry':
        case '😡':
          playlistTitle = "Release the Tension";
          break;
        case 'content':
        case '😐':
          playlistTitle = "Peaceful Moments";
          break;
        case 'excited':
        case '🤩':
          playlistTitle = "Energy Boost";
          break;
        default:
          playlistTitle = "Mood Mix";
      }
      
      setPlaylist(prevPlaylist => ({
        ...prevPlaylist,
        title: playlistTitle
      }));
    }
  }, [mood]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would trigger audio playback
  };

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

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.tracks.length);
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.tracks.length - 1 : prev - 1));
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const navigateToMusicPlayer = (trackIndex) => {
    setCurrentTrack(trackIndex);
    navigation.navigate('MusicPlayer', { 
      trackId: playlist.tracks[trackIndex].id,
      trackIndex
    });
  };

  const TrackItem = ({ track, index }) => (
    <TouchableOpacity
      style={[
        styles.trackItem,
        currentTrack === index && styles.currentTrack
      ]}
      onPress={() => navigateToMusicPlayer(index)}
    >
      <Text style={[styles.trackNumber, currentTrack === index && styles.currentTrackText]}>
        {index + 1}
      </Text>
      <View style={styles.trackInfo}>
        <Text style={[styles.trackTitle, currentTrack === index && styles.currentTrackText]}>
          {track.title}
        </Text>
        <Text style={[styles.trackArtist, currentTrack === index && styles.currentTrackText]}>
          {track.artist}
        </Text>
      </View>
      <Text style={[styles.trackPlays, currentTrack === index && styles.currentTrackText]}>
        {track.plays}
      </Text>
      <Text style={[styles.trackDuration, currentTrack === index && styles.currentTrackText]}>
        {track.duration}
      </Text>
      <TouchableOpacity onPress={() => toggleLike(track.id)} style={styles.likeButton}>
        <Ionicons
          name={likedTracks.has(track.id) ? "heart" : "heart-outline"}
          size={20}
          color={likedTracks.has(track.id) ? "#ff3b30" : currentTrack === index ? "#ffffff" : "#8e8e93"}
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
          colors={['black', 'rgb(200, 0, 255)', COLORS.primary]}
          style={styles.header}
        >
          {/* MoodBeats Logo and Search Bar */}
          <View style={styles.headerTop}>
            <Text style={styles.logoText}>MOODBEATS</Text>
            <View style={styles.searchContainer}>
              <Feather name="search" size={16} color="#fff" style={styles.searchIcon} />
              <TextInput placeholder="Search" placeholderTextColor="#fff" style={styles.searchInput} />
            </View>
          </View>
          
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
          <TouchableOpacity style={styles.repeatButton}>
            <Ionicons name="repeat" size={24} color="#8e8e93" />
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
          <TouchableOpacity onPress={prevTrack}>
            <Ionicons name="play-skip-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.miniPlayButton}
            onPress={togglePlay}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextTrack}>
            <Ionicons name="play-skip-forward" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation Bar is now handled by the NavigationBar component */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    marginBottom: 90, // Add space for playback bar and navbar
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  coverImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  playlistInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  playlistTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  playlistCreator: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  playlistFollowers: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(200, 0, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  shuffleButton: {
    padding: 10,
    marginRight: 15,
  },
  repeatButton: {
    padding: 10,
  },
  trackList: {
    padding: 20,
    paddingBottom: 100,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  currentTrack: {
    backgroundColor: 'rgba(200, 0, 255, 0.7)',
  },
  currentTrackText: {
    color: '#ffffff',
  },
  trackNumber: {
    width: 30,
    fontSize: 16,
    color: 'white',
  },
  trackInfo: {
    flex: 1,
    marginRight: 20,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    color: '#8e8e93',
  },
  trackPlays: {
    fontSize: 14,
    color: '#8e8e93',
    width: 50,
  },
  trackDuration: {
    fontSize: 14,
    color: '#8e8e93',
    width: 50,
    textAlign: 'right',
    marginRight: 10,
  },
  likeButton: {
    padding: 5,
  },
  playbackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  miniCover: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  nowPlaying: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  nowPlayingArtist: {
    fontSize: 12,
    color: '#8e8e93',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  miniPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgb(200, 0, 255)',
    justifyContent: 'center',
    alignItems: 'center',
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

export default MusicPlaylistApp;