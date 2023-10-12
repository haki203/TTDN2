/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, LogBox, Image} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppNavigator from './navigation/AppNavigator';
import WaitScreen from './components/WaitScreen';
import Welcome from './components/Welcome';
import Read from './components/Read';
const App = () => {
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <AppNavigator />
    //   </NavigationContainer>
    // </Provider>
    <View style={styles.container}>
      <WaitScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
});

export default App;
