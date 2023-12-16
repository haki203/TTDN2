/* eslint-disable prettier/prettier */
import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import ItemListView from './components/ItemFlatList/ItemListView';
import PlayScreen from './components/play/PlayScreen';
import LibraryScreen from './components/LibraryScreen';
import HomeScreen from './components/HomeScreen';
import {AppContextProvider} from './navigation/AppContext';
import BookDetail from './components/BookDetail';
console.disableYellowBox = true;
import {LogBox} from 'react-native';
import Notification from './components/notification/Notification';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {AppContext} from './navigation/AppContext';

LogBox.ignoreAllLogs(true);

const App = () => {
  const HandleDeepLinking = () => {
    const {navigate} = useNavigation();
    const {idBookLink, setIdBookLink} = useContext(AppContext);

    const handleDynamicLinks = async link => {
      console.log('Foreground link handling:', link);

      let productId = link.url.split('=').pop();
      console.log('productId:', productId);
      // navigate('BookDetail', {itemId: productId});
      setIdBookLink(productId);

      // navigate('HomeScreen');
    };
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      return () => unsubscribe();
    }, []);

    return null;
  };
  return (
    <AppContextProvider>
      <NavigationContainer>
        <HandleDeepLinking />
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
