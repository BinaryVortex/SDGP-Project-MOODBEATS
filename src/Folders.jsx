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

const searchIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>
`;

const folderIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <SvgXml xml={searchIcon} width={24} height={24} />
        <TextInput style={styles.searchInput} placeholder="Search..." />
      </View>
      <ScrollView contentContainerStyle={styles.playlistContainer}>
        <View style={styles.gridContainer}>
          {playlists.map((playlist) => (
            <TouchableOpacity key={playlist.id} style={styles.playlistBox}>
              <SvgXml xml={folderIcon} width={50} height={50} />
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
              <Text style={styles.playlistSubtitle}>{playlist.songs} Songs</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  playlistContainer: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playlistBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  playlistSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default MoodbeatsApp;