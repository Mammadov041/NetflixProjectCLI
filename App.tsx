import './global.css';
import React from 'react';
import Navigation from './src/stacks/Navigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
