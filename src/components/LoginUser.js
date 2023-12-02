import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import React, { useEffect, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../navigation/AppContext';
const color = '#FF0000';
const backgroundleader = '#404040';
const colorText = '#f2f2f2';
const LoginUser = props => {
  const { navigation } = props;
  const { test, setTest } = useContext(AppContext);

  return (
    <ImageBackground source={require('../assets/images/bg_welcome.png')}
      style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left}>
        <Icon name="left" size={25} color="white" />
      </TouchableOpacity>
      
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image style={styles.image} source={require('../assets/images/logo2.png')} />
        <View style={styles.leader}>
        
          {/* <Image
            style={styles.profile}
          // source={require('../components/tab_view/image/profiles.png')}
          ></Image> */}
          <Text style={styles.txt}>Đăng nhập Authens App để có trải nghiệm tốt hơn</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.txt2}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leader: {
    width: '180%',
    height: '15%',
    borderRadius: 15,
    alignItems: 'center',
  },
  profile: {
    marginTop: '-14%',
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 13,
    width: '35%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
  },
  txt: {
    top: '-50%',
    color: colorText,
    fontSize: 22,
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: '600',
    width: '35%', 
    textAlign: 'center'
  },
  txt1: {
    top: '20%',
  },
  left: {
    width: '10%',
    height: '5%',
    borderRadius: 30,
    position: 'absolute',
    left: 0,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {
    color: colorText,
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  image:{
    width: 105,
    height: 100,
    top: '-10%'
    // marginTop: '85%'
  }
});