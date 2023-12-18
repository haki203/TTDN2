import { Button, StyleSheet, Text, View, ToastAndroid, ImageBackground, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../navigation/AppContext';
const { width, height } = Dimensions.get('window')
import AxiosIntance from '../../axios/AxiosIntance';
const color = '#FFFFFF';
const WelcomeGuess = (props) => {
  const { navigation } = props;
  const { infoUser, setinfoUser } = useContext(AppContext);
  const { isLogin, setIsLogin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const goLogin = async () => {
    setIsLoading(true)
    await AsyncStorage.setItem('isLoginGuess', 'true');
    console.log('Trạng thái đăng nhập đã được lưu.');
    navigation.navigate('HomeDemo')

  }
  const goDemo = async () => {

    setIsLoading2(true)
    navigation.navigate('Chao');
  }
  useEffect(() => {
    const checkLoginGuess = async () => {
      // check khi ko dang nhap
      try {
        // Kiểm tra trạng thái đăng nhập từ AsyncStorage
        const isLoginGuess = await AsyncStorage.getItem('isLoginGuess');
        console.log('log day:', isLoginGuess)
        if (isLoginGuess !== null && isLoginGuess !== undefined) {
          // Nếu đã đăng nhập, chuyển đến màn hình HomeDemo
          navigation.navigate('HomeDemo');
          ToastAndroid.show("Chào mừng bạn đã trở lại", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      }

    };
    const checkLogin = async () => {
      // check khi ko dang nhap
      try {
        // Kiểm tra trạng thái đăng nhập từ AsyncStorage
        const infoUserNe = await AsyncStorage.getItem('infoUser');


        if (infoUserNe) {
          const infoUserObject = JSON.parse(infoUserNe);
          console.log('log day ne:', infoUserObject)
          console.log(infoUserObject.name);
          setIsLogin(true)
          const res = await AxiosIntance().post('/user/login', {
            email: infoUserObject.email,
          });
          console.log(res.user.avatar);
          if (res.result) {
            const infoUser = {
              name: res.user.full_name,
              premium: res.user.premium,
              avatar: res.user.avatar,
              id: res.user._id,
              phone: res.user.phone,
              email: res.user.email,
              
            };
            setinfoUser(infoUser);
          }
          //setinfoUser(infoUserObject)
          navigation.navigate('Chao');
          ToastAndroid.show("Chào mừng bạn đã trở lại", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      }

    };
    // check khi dang nhap

    // Gọi hàm kiểm tra trạng thái đăng nhập khi màn hình được hiển thị
    checkLoginGuess();
    checkLogin();
  }, []); // [] là dependency array, đảm bảo useEffect chỉ chạy một lần sau khi component được mount
  // Nếu giá trị không phải là "false", bạn có thể xử lý tùy thuộc vào yêu cầu của bạn
  // navigation.navigate('Chao');
  return (
    // <View>
    //   <Button title='Bắt đầu' onPress={goLogin}></Button>
    //   <Button title='Đăng nhập' onPress={goDemo}></Button>
    // </View>
    <View style={styles.container}>
      <ImageBackground style={{ width: width, height: height }} source={require('../../assets/images/bg_welcome.png')}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.textView_3}>Chào mừng bạn đến với</Text>
            <Image style={styles.image} source={require('../../assets/images/logo2.png')} />
            <View style={styles.textView}>
              <Text style={styles.textView_1}>Athens</Text>
              <Text style={styles.textView_2}>
                Nghe hàng ngàn cuốn sách nói, thiền định, truyện ngủ và các nội dung khác
              </Text>
            </View>
          </View>
          <View style={styles.touchable}>
            {
              isLoading ?
                (<TouchableOpacity style={styles.touchableFB} >
                  <ActivityIndicator style={styles.textView_GG} size={30} color={'#f2f2f2'} />
                </TouchableOpacity>) :
                (<TouchableOpacity style={styles.touchableGG} onPress={goLogin}>
                  <Text style={styles.textView_GG}>Bắt đầu</Text>
                </TouchableOpacity>)
            }
            {
              isLoading2 ?
                (<TouchableOpacity style={styles.touchableFB} >
                  <ActivityIndicator style={styles.textView_GG} size={30} color={'#f2f2f2'} />
                </TouchableOpacity>) :
                (<TouchableOpacity style={styles.touchableGG} onPress={goDemo}>
                  <Text style={styles.textView_GG}>Đăng nhập</Text>
                </TouchableOpacity>)
            }

          </View>
        </View>
      </ImageBackground>
      {/* <Button title='Bắt đầu' onPress={goDemo}></Button> */}
      {/* <Button  title='Đăng nhập' onPress={goLogin}></Button> */}
    </View>
  )
}

export default WelcomeGuess

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    // backgroundColor: '#D9D9D9',
    borderRadius: 150,
    width: 100,
    height: 100,
    marginTop: 10,
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
    marginTop: 10,
  },
  textView_1: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'italic',
  },
  textView_2: {
    color: '#d5d5d5',
    width: 300,
    fontSize: 15,
    paddingTop: 20,
    textAlign: 'center'
  },
  textView_3: {
    color: '#d5d5d5',
    fontSize: 30,
    paddingTop: 20,
    textAlign: 'center'
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
    height: 70,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
  },
  textView_FB: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  touchableGG: {
    width: 300,
    height: 63,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  textView_GG: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
})