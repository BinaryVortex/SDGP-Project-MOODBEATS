import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationBar from './NavigationBar';

const ScreenWithNavBar = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 50, // Add padding to prevent content from being covered by nav bar
  },
});

export default ScreenWithNavBar;
