import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MoodBeatsProfileScreen = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const fadeIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowProfile(false));
  };

  const handleViewProfile = () => {
    setShowProfile(true);
    fadeIn();
  };

  const handleBackPress = () => {
    fadeOut();
  };

  const userData = {
    name: 'Vihari Ambegoda',
    username: '@vihariambegoda128',
    image: 'https://via.placeholder.com/100/222222/FFFFFF?text=VA',
    followers: '12.5K',
    following: '354',
    likes: '45.2K',
    mood: 'Chill',
  };

  const recentSongs = [
    { id: 1, title: 'Midnight City', artist: 'M83', image: 'https://via.placeholder.com/60/6A11CB/FFFFFF?text=M83', duration: '4:03' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', image: 'https://via.placeholder.com/60/2575FC/FFFFFF?text=WD', duration: '3:22' },
    { id: 3, title: 'Dreams', artist: 'Fleetwood Mac', image: 'https://via.placeholder.com/60/6A11CB/FFFFFF?text=FM', duration: '4:17' },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>Your video collection will appear here</Text>
          </View>
        );
      case 'downloads':
        return (
          <View style={styles.tabContent}>
            {recentSongs.map(song => (
              <TouchableOpacity key={song.id} style={styles.songItem}>
                <Image source={{ uri: song.image }} style={styles.songImage} />
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <Text style={styles.songDuration}>{song.duration}</Text>
                <TouchableOpacity style={styles.playButton}>
                  <Icon name="play-arrow" size={20} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'badges':
        return (
          <View style={styles.tabContent}>
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="music-note" size={24} color="#FFD700" />
                <Text style={styles.badgeText}>Music Enthusiast</Text>
              </View>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="fire" size={24} color="#FF4500" />
                <Text style={styles.badgeText}>Trending Creator</Text>
              </View>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="crown" size={24} color="#9370DB" />
                <Text style={styles.badgeText}>Premium Member</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.header}
      >
        <Text style={styles.logoText}>MOODBEATS</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </LinearGradient>

      {/* If showProfile is true, show the User Profile Details */}
      {showProfile ? (
        <Animated.View 
          style={[
            styles.profileDetailContainer, 
            { opacity: animatedValue }
          ]}
        >
          {/* Changed from LinearGradient to View with white background */}
          <View style={styles.profileWhiteBackground}>
            <Image source={{ uri: userData.image }} style={styles.profileImageLarge} />
            <Text style={styles.profileNameLargeBlack}>{userData.name}</Text>
            <Text style={styles.profileUsernameLargeBlack}>{userData.username}</Text>
            
            <View style={styles.moodContainerBlack}>
              <Text style={styles.moodLabelBlack}>Current Mood:</Text>
              <View style={styles.moodBadgeBlack}>
                <MaterialCommunityIcons name="music" size={16} color="#6A11CB" />
                <Text style={styles.moodTextBlack}>{userData.mood}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackPress}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Profile Section */}
          <LinearGradient
            colors={['#ffffff', '#f5f5f5']}
            style={styles.profileSection}
          >
            <View style={styles.profileHeader}>
              <Image source={{ uri: userData.image }} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userData.name}</Text>
                <Text style={styles.profileUsername}>{userData.username}</Text>
                <View style={styles.moodIndicator}>
                  <MaterialCommunityIcons name="music" size={14} color="#fff" />
                  <Text style={styles.moodText}>{userData.mood}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleViewProfile}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#6A11CB', '#2575FC']}
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>View Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'videos' && styles.activeMenuItem]} 
              onPress={() => setActiveTab('videos')}
            >
              <Icon name="videocam" size={24} color={activeTab === 'videos' ? '#6A11CB' : '#000'} />
              <Text style={[styles.menuItemText, activeTab === 'videos' && styles.activeMenuText]}>Your videos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'downloads' && styles.activeMenuItem]} 
              onPress={() => setActiveTab('downloads')}
            >
              <Icon name="file-download" size={24} color={activeTab === 'downloads' ? '#6A11CB' : '#000'} />
              <Text style={[styles.menuItemText, activeTab === 'downloads' && styles.activeMenuText]}>Downloads</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'badges' && styles.activeMenuItem]} 
              onPress={() => setActiveTab('badges')}
            >
              <MaterialCommunityIcons name="trophy-award" size={24} color={activeTab === 'badges' ? '#6A11CB' : '#000'} />
              <Text style={[styles.menuItemText, activeTab === 'badges' && styles.activeMenuText]}>Badges</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderTab()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoText: { 
    color: '#000', 
    fontSize: 22, 
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  iconButton: { 
    marginLeft: 18,
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 8,
  },
  content: { 
    flex: 1 
  },
  profileSection: { 
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  profileImage: { 
    width: 70, 
    height: 70, 
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#6A11CB',
  },
  profileInfo: { 
    marginLeft: 16, 
    flex: 1 
  },
  profileName: { 
    color: '#000', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  profileUsername: { 
    color: '#666', 
    fontSize: 14,
    marginBottom: 5,
  },
  moodIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 17, 203, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  moodText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  actionButtons: { 
    alignItems: 'center' 
  },
  actionButton: { 
    width: '50%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  actionButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center' 
  },
  menuSection: { 
    marginTop: 10, 
    borderTopWidth: 0.5, 
    borderTopColor: '#ddd' 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(106, 17, 203, 0.1)',
  },
  menuItemText: { 
    color: '#000', 
    fontSize: 16, 
    marginLeft: 16 
  },
  activeMenuText: {
    color: '#6A11CB',
    fontWeight: 'bold',
  },

  // Tab Content
  tabContent: {
    padding: 16,
    minHeight: 200,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  songArtist: {
    color: '#666',
    fontSize: 14,
  },
  songDuration: {
    color: '#666',
    fontSize: 14,
    marginRight: 10,
  },
  playButton: {
    backgroundColor: '#6A11CB',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgesContainer: {
    marginTop: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  badgeText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },

  // Styles for User Profile View - UPDATED with white background and black text
  profileDetailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileWhiteBackground: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageLarge: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#6A11CB',
  },
  profileNameLargeBlack: { 
    color: '#000', 
    fontSize: 26, 
    fontWeight: 'bold' 
  },
  profileUsernameLargeBlack: { 
    color: '#666', 
    fontSize: 18, 
    marginBottom: 30 
  },
  moodContainerBlack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  moodLabelBlack: {
    color: '#000',
    fontSize: 16,
    marginRight: 10,
  },
  moodBadgeBlack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#6A11CB',
  },
  moodTextBlack: {
    color: '#000',
    fontSize: 12,
    marginLeft: 4,
  },
  backButton: { 
    backgroundColor: '#800080', 
    borderRadius: 25, 
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center' 
  },
});

export default MoodBeatsProfileScreen;