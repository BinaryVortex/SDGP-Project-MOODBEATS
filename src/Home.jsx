import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const artists = [
  "The Weeknd", "Travis Scott", "Central Cee", 
  "Ariana Grande", "Drake"
];

export default function HomePage() {
  return (
    <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.container}>
      
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>MOODBEATS</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput placeholder="Search" placeholderTextColor="#aaa" style={styles.searchInput} />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>

        {/* Recently Played */}
        <Section title="Recently Played">
          <FlatList
            horizontal
            data={Array(3).fill(0)}
            renderItem={({ index }) => <MusicItem title={`Track ${index + 1}`} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            horizontal
            data={Array(3).fill(0)}
            renderItem={({ index }) => <MusicItem title={`Track ${index + 1}`} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            horizontal
            data={Array(3).fill(0)}
            renderItem={({ index }) => <MusicItem title={`Track ${index + 1}`} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        {/* Artists */}
        <Section title="Artists">
          <FlatList
            horizontal
            data={artists}
            renderItem={({ item }) => <ArtistItem name={item} />}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        {/* Trending */}
        <Section title="Trending">
          <FlatList
            horizontal
            data={Array(10).fill(0)}
            renderItem={({ index }) => <MusicItem title={`Track ${index + 1}`} />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <NavItem icon="home" label="Home" />
        <NavItem icon="heart" label="Mood" />
        <NavItem icon="music" label="Playlist" />
      </View>
    </LinearGradient>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const MusicItem = ({ title }) => (
  <TouchableOpacity style={styles.musicItem}>
    <View style={styles.musicImage}>
      <Text style={styles.musicTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const ArtistItem = ({ name }) => (
  <TouchableOpacity style={styles.artistItem}>
    <View style={styles.artistImage} />
    <Text style={styles.artistName}>{name}</Text>
  </TouchableOpacity>
);

const NavItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.navItem}>
    <Feather name={icon} size={20} color="#bbb" />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

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

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },

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
     paddingHorizontal: 10 
    },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 10 
  },

  musicItem: { 
    marginRight: 4, 
    alignItems: 'center', 
    marginBottom: 4 
  },

  musicImage: { 
    width: 126, 
    height: 126, 
    borderRadius: 10, 
    backgroundColor: '#444' 
  },
  
  musicTitle: { 
    marginTop: 5, 
    color: '#ccc', 
    fontSize: 12, 
    paddingTop: 98, 
    marginLeft: 8 
  },

  artistItem: { 
    marginRight: 12, 
    alignItems: 'center' 
  },

  artistImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 20, 
    backgroundColor: '#666' 
  },

  artistName: { 
    marginTop: 5, 
    color: '#ccc', 
    fontSize: 12, 
    textAlign: 'center' 
  },
  
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    backgroundColor: '#111', 
    position: 'absolute', 
    bottom: 0, 
    width: '100%' 
  },

  navItem: { 
    alignItems: 'center' 
  },

  navLabel: { 
    fontSize: 10, 
    color: '#bbb', 
    marginTop: 7 
  }
  
});
