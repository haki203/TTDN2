/* eslint-disable prettier/prettier */
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WaitScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_Wait.png')}
      style={styles.container}>
      <Image
        source={require('../assets/images/10089818_preview_rev_1.png')}
        style={styles.image}></Image>
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
    width: 150,
    height: 150,
  },
});
