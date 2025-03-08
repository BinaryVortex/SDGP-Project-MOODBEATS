import React from 'react';
import { registerRootComponent } from 'expo';
import MusicApp from './MusicApp';

// If your index.tsx has a different structure, you might need to adapt this
const App = () => {
  return <MusicApp />;
};

// This registers the main component
registerRootComponent(App);

// If your project uses AppRegistry instead, it might look like this:
// import { AppRegistry } from 'react-native';
// AppRegistry.registerComponent('YourAppName', () => App);

export default App;