import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';

const artists = [
  "The Weeknd", "Travis Scott", "Central Cee", 
  "Ariana Grande", "Drake"
];

export default function HomePage() {
  return (
    <LinearGradient colors={["#000", "#3b85ed"]} style={styles.container}>
      
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>MOODBEATS</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color="#fff" style={styles.searchIcon} />
            <TextInput placeholder="Search" placeholderTextColor="#fff" style={styles.searchInput} />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>

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

        {/* Quick Pick */}
        <Section title="Quick Pick">
          <FlatList
              horizontal
              data={Array(4).fill(0)}
              renderItem={({ index }) => <MusicItemNew title={`Track ${index + 1}`} />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            
           />

           <View style={{height: 10}}></View>

          <FlatList
              horizontal
              data={Array(4).fill(0)}
              renderItem={({ index }) => <MusicItemNew title={`Track ${index + 1}`} />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            
           />
           
           <View style={{height: 10}}></View>

           <FlatList
           horizontal
           data={Array(4).fill(0)}
           renderItem={({ index }) => <MusicItemNew title={`Track ${index + 1}`} />}
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
            data={Array(5).fill(0)}
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
        <NavItem icon="user" label="Profile"/>
      </View>
    </LinearGradient>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </View>
    {children}
  </View>
);

const MusicItem = ({ title }) => (
  <TouchableOpacity style={styles.musicItem} >
    <View style={styles.musicImage}>
      <Text style={styles.musicTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const MusicItemNew = ({ title }) => (
  <TouchableOpacity style={styles.musicItem2} >
    <View style={styles.musicImage2}>
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
    <Feather name={icon} size={20} color="#fff" />
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
    marginBottom: 4, 
  },

  musicItem2: { 
    width: 392,
    backgroundColor: '#444' ,
    height: 1, 
    borderRadius: 10, 
    marginBottom: 100
  },

  musicImage: { 
    width: 126, 
    height: 126, 
    borderRadius: 10, 
    backgroundColor: '#444' 
  },musicImage2: { 
    width: 1000, 
    height: 126, 
    borderRadius: 10, 
    backgroundColor: '#444' 
  },

  

  
  
  musicTitle: { 
    marginTop: 5, 
    color: '#fff', 
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
    color: '#fff', 
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
    color: '#fff', 
    marginTop: 5 
  }
  
});
