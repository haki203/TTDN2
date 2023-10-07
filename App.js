/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {StyleSheet, Text, View, LogBox, Image} from 'react-native';
import Screen1 from './src/animation/Screen1';
import GoogleLogin from './src/googleLogin/googleLogin';
import Counter from './src/hooks/Counter';
import {Provider} from './src/hooks/CounterContext';

const App = () => {
  return (
    //<GoogleLogin />
    //Hook ---->
      <Provider>
      <View style={styles.container1}>
        <Counter />
      </View>
    </Provider>
    // <----Hook
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
