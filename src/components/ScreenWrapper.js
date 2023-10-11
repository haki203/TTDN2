/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const ScreenWrapper = ({ children }) => {
  return(
    <LinearGradient style={styles.container} colors={['#6fa8dc', '#cfe2f3']}>
        {children}
    </LinearGradient>
  )
   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
