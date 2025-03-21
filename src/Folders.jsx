import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS, GRADIENTS } from './constants/theme';

const folderIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
</svg>
`;

const playlists = [
  { id: 1, title: 'Most Popular Songs', songs: 100 },
  { id: 2, title: 'Favourite Songs', songs: 100 },
  { id: 3, title: 'Most Listened Songs', songs: 100 },
  { id: 4, title: 'Custom Playlist', songs: 100 },
];

const MoodbeatsApp = () => {
  const navigation = useNavigation();
  
  const handlePlaylistPress = (playlistId) => {
    navigation.navigate('PlaylistScreen', { 
      playlistId,
      source: 'folders'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient colors={GRADIENTS.main} style={styles.container}>
        {/* Header with logo and search bar */}
        <View style={styles.header}>
          <Text style={styles.logoText}>MOODBEATS</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Search" placeholderTextColor="#bbb" style={styles.searchInput} />
          </View>
        </View>
        
        <ScrollView contentContainerStyle={styles.playlistContainer}>
          <View style={styles.gridContainer}>
            {playlists.map((playlist) => (
              <TouchableOpacity 
                key={playlist.id} 
                style={styles.playlistBox} 
                onPress={() => handlePlaylistPress(playlist.id)}
              >
                <SvgXml xml={folderIcon} width={50} height={50} />
                <Text style={styles.playlistTitle}>{playlist.title}</Text>
                <Text style={styles.playlistSubtitle}>{playlist.songs} Songs</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        {/* Bottom Navigation Bar is now handled by the NavigationBar component */}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingLeft: 10,
    width: 144,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    color: COLORS.text,
    fontSize: 14,
    flex: 1,
  },
  playlistContainer: {
    paddingBottom: 80,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playlistBox: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: COLORS.text,
  },
  playlistSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  }
});

export default MoodbeatsApp;