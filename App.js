/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView } from 'react-native';

import AppContainer from './src/screen/home';

export default App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContainer />
    </SafeAreaView>
  );
};
