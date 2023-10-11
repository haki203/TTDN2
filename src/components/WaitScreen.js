/* eslint-disable prettier/prettier */
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WaitScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_Wait.png')}
      style={styles.container}>
      <View style={styles.image}>
        
      </View>
    </ImageBackground>
  );
};

export default WaitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#D9D9D9',
    borderRadius: 150,
    width: 100,
    height: 100,
  },
});
