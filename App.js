import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Image, } from 'react-native';
import Screen1 from './src/animation/Screen1';


const App = () => {

  return (
    <Screen1/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

export default App;