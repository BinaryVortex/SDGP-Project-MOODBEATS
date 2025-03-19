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

const MoodbeatsApp = ({setPage}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      {/* Added LinearGradient as the main container background */}
      <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
        {/* Added header with logo and search bar from first code */}
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
              <TouchableOpacity key={playlist.id} style={styles.playlistBox} onPress={() => setPage("expanded")}>
                <SvgXml xml={folderIcon} width={50} height={50} />
                <Text style={styles.playlistTitle}>{playlist.title}</Text>
                <Text style={styles.playlistSubtitle}>{playlist.songs} Songs</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.navbar}>
          <NavItem icon="home" label="Home" setPage={setPage}/>
          <NavItem icon="heart" label="Mood"  setPage={setPage}/>
          <NavItem icon="music" label="Playlist" setPage={setPage} color="#FF00FF"/>
          <NavItem icon="user" label="Profile" setPage={setPage}/>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const NavItem = ({ icon, label, color, setPage }) => (
  <TouchableOpacity style={styles.navItem} onPress={() => setPage(icon)}>
    <Feather name={icon} size={20} color={color || "#bbb"} />
    <Text style={[styles.navLabel, { color: color || "#bbb" }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Set background color for status bar area
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  // Added header styles from first code
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Changed to white for dark gradient theme
  },
  // Modified search container to match first code's style
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
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  playlistContainer: {
    paddingBottom: 80, // Added more padding to prevent content from hiding behind navbar
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
    color: '#fff',
  },
  playlistSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    position: 'absolute', 
    bottom: 0, 
    width: '110%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItem: { 
    alignItems: 'center'  
  },
  navLabel: { 
    fontSize: 10, 
    color: '#fff', 
    marginTop: 5 
  }
});

export default MoodbeatsApp;