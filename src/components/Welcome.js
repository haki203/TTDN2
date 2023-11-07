/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Image, ImageBackground, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppContext } from '../navigation/AppContext';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import AxiosIntance from '../axios/AxiosIntance';

const { width, height } = Dimensions.get('window');
const backgroundColor = '#FDFDFD';
const color = '#FFFFFF';
const Welcome = (props) => {
  GoogleSignin.configure({
    webClientId: '604464843561-7bobfsn4dq8d243n2ka1ngpiavlbof23.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false,
  });
  const { navigation } = props;
  const { setIsLogin ,setinfoUser} = useContext(AppContext);

  //---------------------- login google ---------------------- //
  const onLoginGG = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      console.log('LoginGG');
      const userInfor = await GoogleSignin.signIn();
      const res = await AxiosIntance().post("/user/login", { email: userInfor.user.email });
      if(res.result){
        
      }
      const infoUser ={
        name:userInfor.name,avatar:userInfor.photo
      }
      setinfoUser(infoUser);
      console.log(userInfor);
      ToastAndroid.show("Đăng Nhập thành công", ToastAndroid.SHORT);
      setIsLogin(true);
    } catch (error) {
      ToastAndroid.show("Đăng nhập thất bại ", ToastAndroid.SHORT);
      console.log(error);
    }

  }




  //---------------------- login facebook ---------------------- //
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    } else {

      console.log('loginFB');

      console.log(data);
      setIsLogin(true);
      ToastAndroid.show("Đăng Nhập thành công", ToastAndroid.SHORT);

    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  // ________________________________________________________________________________________//




  //---------------------- login google ---------------------- //

  return (
    <View style={styles.container}>
      <ImageBackground style={{ position: 'absolute', width: width, height: height }} source={require('../assets/images/bg_welcome.png')} />
      <ImageBackground style={styles.image} source={require('../assets/images/logo-athens.png')} />
      <View style={styles.textView}>
        <Text style={styles.textView_1}>Authens</Text>
        <Text style={styles.textView_2}>
          AudioBox allowing you to listen to your favourite books anytime,
          anywhere
        </Text>
      </View>

      <View style={styles.touchable}>
        <TouchableOpacity style={styles.touchableFB} onPress={() => onFacebookButtonPress()}>
          <Image style={styles.icon} source={require('../assets/images/ic_fb.png')}></Image>
          <Text style={styles.textView_GG}>Continue with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.textView_3}>OR</Text>
        <TouchableOpacity style={styles.touchableGG} onPress={onLoginGG}>
          <Image style={styles.icon} source={require('../assets/images/ic_gg.png')}></Image>
          <Text style={styles.textView_GG}>Continue with Google</Text>
        </TouchableOpacity>

      </View>
    </View>
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
    color: '#d5d5d5',
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
    color: '#D9D9D9',
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
