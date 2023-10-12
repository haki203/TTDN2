import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Image, } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import ItemListView from './components/ItemListView';
import PlayScreen from './components/play/PlayScreen';
import LibraryScreen from './components/LibraryScreen';
import HomeScreen from './components/HomeScreen';
import { AppContextProvider } from './navigation/AppContext';
console.disableYellowBox = true;

const App = () => {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

export default App;