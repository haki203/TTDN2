/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';

const backgroundColor = '#FDFDFD';
const color = '#D45555';
const color1 = '#FFFFFE';
const fontchu = 'popins';
const Welcome = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_welcome.png')}
      style={styles.container}>
      <Image
        source={require('../assets/images/10089818_preview_rev_1.png')}
        style={styles.image}
      />

      <View style={styles.textView}>
        <Text style={styles.textView_1}>
          Welcome to <Text style={{color: color}}>Athens</Text>
        </Text>
        <Text style={styles.textView_2}>
          AudioBox allowing you to listen to your favourite books anytime,
          anywhere
        </Text>
      </View>

      <View style={styles.touchable}>
        <TouchableOpacity style={styles.touchableFB}>
          <Image
            style={styles.icon}
            source={require('../assets/images/ic_fb.png')}></Image>
          <Text style={styles.textView_FB}>Continue with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.textView_3}>OR</Text>
        <TouchableOpacity style={styles.touchableGG}>
          <Image
            style={styles.icon}
            source={require('../assets/images/ic_gg.png')}></Image>
          <Text style={styles.textView_GG}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.textView_4}>Sign in with audibox username</Text>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: backgroundColor,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 30,
  },
  image: {
    // backgroundColor: '#D9D9D9',
    // borderRadius: 150,
    width: 150,
    height: 150,
  },
  textView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -50,
  },
  textView_1: {
    color: color1,
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
    color: color1,
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
    width: 20,
    height: 20,
  },
});
