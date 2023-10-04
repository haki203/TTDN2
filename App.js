import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox, Image, } from 'react-native';
import GoogleLogin from './src/googleLogin/googleLogin';



const App = () => {

  return (
    <View>
      <GoogleLogin/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

export default App;