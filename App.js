import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Image, } from 'react-native';
import Screen1 from './src/animation/Screen1';
import GoogleLogin from './src/googleLogin/googleLogin';


const App = () => {

  return (
    <GoogleLogin/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

export default App;