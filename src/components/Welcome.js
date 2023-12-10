/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppContext} from '../navigation/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AxiosIntance from '../axios/AxiosIntance';

const {width, height} = Dimensions.get('window');
const backgroundColor = '#FDFDFD';
const color = '#FFFFFF';
const Welcome = props => {
  GoogleSignin.configure({
    webClientId:
      '604464843561-7bobfsn4dq8d243n2ka1ngpiavlbof23.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false,
  });
  const {navigation} = props;
  const {setIsLogin, setinfoUser} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  //---------------------- login google ---------------------- //
  const onLoginGG = async () => {
    try {
      setIsLoading(true);

      await GoogleSignin.hasPlayServices();
      console.log('LoginGG');
      const userInfor = await GoogleSignin.signIn();
      const res = await AxiosIntance().post('/user/login', {
        email: userInfor.user.email,
      });
      if (res.result) {
        const infoUser = {
          name: res.user.full_name,
          premium: res.user.premium,
          avatar: res.user.avatar,
          id: res.user._id,
          phone: res.user.phone,
          email: res.user.email,
          banStatus: res.user.ban,
        };
        setinfoUser(infoUser);
        console.log(res.user);
        if (res.user.ban == true) {
          Alert.alert(
            'Thông báo',
            'Bạn đã bị cấm. Vui lòng liên hệ với quản trị viên.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsLoading(false);
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          ToastAndroid.show('Đăng Nhập thành công', ToastAndroid.SHORT);
          //luu infouser vao asn
          try {
            const infoUserString = JSON.stringify(infoUser);
            await AsyncStorage.setItem('infoUser', infoUserString);
            console.log('Thông tin người dùng đã được lưu vào AsyncStorage.');
          } catch (error) {
            console.error(
              'Lỗi khi lưu thông tin người dùng vào AsyncStorage:',
              error,
            );
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 3000);

          setIsLogin(true);
        }
      } else {
        ToastAndroid.show('Đăng nhập thất bại ', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Đăng nhập thất bại ', ToastAndroid.SHORT);
      console.log(error);
    }
  };

  //---------------------- login facebook ---------------------- //
  async function getFacebookUserData(accessToken) {
    const response = await fetch(
      `https://graph.facebook.com/v12.0/me?fields=id,name,email,phone,avatar&access_token=${accessToken}`,
    );
    const userData = await response.json();
    return userData;
  }
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result fb ne: ', result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    } else {
      const userData = await getFacebookUserData(data.accessToken);
      console.log('Thông tin người dùng Facebook:', userData);
      console.log('loginFB');
      console.log('data fb ne: ', data);
      // loginnnnnnnnnnnnnnnnnnnnnnn api
      setIsLoading(true);

      const res = await AxiosIntance().post('/user/login', {
        email: data.userID,
      });
      if (res.result) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        setIsLogin(true);

        const infoUser = {
          name: res.user.full_name,
          premium: res.user.premium,
          avatar: res.user.avatar,
          id: res.user._id,
          phone: res.user.phone,
          email: res.user.email,
        };
        try {
          const infoUserString = JSON.stringify(infoUser);
          await AsyncStorage.setItem('infoUser', infoUserString);
          console.log('Thông tin người dùng đã được lưu vào AsyncStorage.');
        } catch (error) {
          console.error(
            'Lỗi khi lưu thông tin người dùng vào AsyncStorage:',
            error,
          );
        }

        setinfoUser(infoUser);
        console.log('result login fb ', res.user);
        ToastAndroid.show('Đăng Nhập thành công', ToastAndroid.SHORT);
      }
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log('facebookCredential fb ne: ', facebookCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  // ________________________________________________________________________________________//

  //---------------------- login google ---------------------- //

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            width: width,
            height: height,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={30} color={'black'} />
        </View>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={{width: width, height: height}}
            source={require('../assets/images/bg_welcome.png')}>
            <View style={styles.body}>
              <View style={styles.title}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/logo-athens.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.textView_1}>Athens</Text>
                  <Text style={styles.textView_2}>
                    Athens cho phép bạn nghe những cuốn sách yêu thích mọi lúc,
                    mọi nơi
                  </Text>
                </View>
              </View>

              <View style={styles.touchable}>
                <TouchableOpacity
                  style={styles.touchableFB}
                  onPress={() => onFacebookButtonPress()}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/images/ic_fb.png')}></Image>
                  <Text style={styles.textView_GG}>
                    Đăng nhập bằng Facebook
                  </Text>
                </TouchableOpacity>
                <Text style={styles.textView_3}>HOẶC</Text>
                <TouchableOpacity
                  style={styles.touchableGG}
                  onPress={onLoginGG}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/images/ic_gg.png')}></Image>
                  <Text style={styles.textView_GG}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#D9D9D9',
    borderRadius: 150,
    width: 100,
    height: 100,
  },
  title: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView_1: {
    color: color,
    fontSize: 40,
    fontFamily: 'italic',
  },
  textView_2: {
    color: '#d5d5d5',
    width: 300,
    fontSize: 15,
    paddingTop: 20,
    textAlign: 'center',
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
