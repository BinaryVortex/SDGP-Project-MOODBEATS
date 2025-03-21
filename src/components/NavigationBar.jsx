import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const NavigationBar = () => {
  const navigation = useNavigation();
  // Use navigationState instead of useRoute to track current screen
  const navigationState = useNavigationState(state => state);
  const [activeScreen, setActiveScreen] = useState('Home');
  
  // Get current route name from navigation state
  useEffect(() => {
    if (navigationState) {
      const currentRouteName = navigationState?.routes[navigationState?.index]?.name || 'Home';
      setActiveScreen(currentRouteName);
    }
  }, [navigationState]);

  // Simple navigation function
  const navigateToScreen = (screenName) => {
    // Only navigate if we're not already on that screen
    if (activeScreen !== screenName) {
      navigation.navigate(screenName);
    }
  };

  // Check if we're on a main screen
  const isMainScreen = (routeName) => {
    return routeName === activeScreen;
  };

  return (
    <View style={styles.navbar}>
      <NavItem 
        icon="home" 
        label="Home" 
        onPress={() => navigateToScreen('Home')}
        isActive={isMainScreen('Home')}
      />
      <NavItem 
        icon="heart" 
        label="Mood" 
        onPress={() => navigateToScreen('Mood')}
        isActive={isMainScreen('Mood')}
      />
      <NavItem 
        icon="music" 
        label="Playlist" 
        onPress={() => navigateToScreen('Playlist')}
        isActive={isMainScreen('Playlist')}
      />
      <NavItem 
        icon="user" 
        label="Profile" 
        onPress={() => navigateToScreen('Profile')}
        isActive={isMainScreen('Profile')}
      />
    </View>
  );
};

const NavItem = ({ icon, label, onPress, isActive }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Feather 
      name={icon} 
      size={20} 
      color={isActive ? "#FF00FF" : "#bbb"} 
    />
    <Text style={[
      styles.navLabel, 
      { color: isActive ? "#FF00FF" : "#bbb" }
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 7,
  },
});

export default NavigationBar;
