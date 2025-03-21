import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const artists = [
  "The Weeknd", "Travis Scott", "Central Cee", 
  "Ariana Grande", "Drake"
];

export default function HomePage() {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>MOODBEATS</Text>
            <TouchableOpacity 
              style={styles.searchContainer}
              onPress={() => navigation.navigate('SearchBar')}
            >
              <Feather name="search" size={16} color="#fff" style={styles.searchIcon} />
              <TextInput 
                placeholder="Search" 
                placeholderTextColor="#fff" 
                style={styles.searchInput}
                editable={false} // Make it non-editable since we use it as a button
              />
            </TouchableOpacity>
          </View>

          {/* Recently Played */}
          <Section 
            title="Recently Played" 
            onSeeAll={() => navigation.navigate('RecentlyPlayed')}
          >
            <FlatList
              horizontal
              data={Array(3).fill(0)}
              renderItem={({ index }) => (
                <MusicItem 
                  title={`Track ${index + 1}`} 
                  onPress={() => navigation.navigate('Playlist', { screen: 'MusicPlayer' })}
                />
              )}
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
        
        {/* Bottom Navigation bar is now handled by the NavigationBar component in AppNavigation.jsx */}
      </LinearGradient>
      
      {/* Remove NavigationBar component as it's now handled globally */}
    </View>
  );
}

const Section = ({ title, children, onSeeAll }) => (
  <View style={styles.section}>
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const MusicItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.musicItem} onPress={onPress}>
    <View style={styles.musicImage}>
      <Text style={styles.musicTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const MusicItemNew = ({ title }) => (
  <TouchableOpacity style={styles.musicItem2}>
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
    backgroundColor: '#444',
    height: 1, 
    borderRadius: 10, 
    marginBottom: 100
  },
  musicImage: { 
    width: 126, 
    height: 126, 
    borderRadius: 10, 
    backgroundColor: '#444' 
  },
  musicImage2: { 
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
  }
});
