/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

const backgroundColor = '#FDFDFD';
const color= '#D45555';
const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={styles.textView}>
        <Text style={styles.textView_1}>Athens</Text>
        <Text style={styles.textView_2}>
          AudioBox allowing you to listen to your favourite books anytime,
          anywhere
        </Text>
      </View>

      <View style={styles.touchable}>
        <TouchableOpacity style={styles.touchableFB}>
          <Image style={styles.icon} source={require('../assets/images/ic_fb.png')}></Image>
          <Text style={styles.textView_FB}>Continue with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.textView_3}>OR</Text>
        <TouchableOpacity style={styles.touchableGG}>
          <Image style={styles.icon} source={require('../assets/images/ic_gg.png')}></Image>
          <Text style={styles.textView_GG}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.textView_4}>Sign in with audibox username</Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 70,
  },
  image: {
    backgroundColor: '#D9D9D9',
    borderRadius: 150,
    width: 100,
    height: 100,
  },
  textView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -50,
  },
  textView_1: {
    color: color,
    fontSize: 40,
    fontFamily: 'italic',
  },
  textView_2: {
    color: '#E8E8E5',
    textAlign: 'center',
    width: 300,
    fontSize: 15,
    paddingTop: 20,
  },
  touchable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    paddingTop: 20,
  },
  touchableFB: {
    width: 300,
    height: 63,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color,
    flexDirection: 'row',
  },
  textView_FB: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textView_3: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  touchableGG: {
    width: 300,
    height: 63,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color,
    flexDirection: 'row',

  },
  textView_GG: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textView_4: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    width:20,
    height:20,
  },
});
