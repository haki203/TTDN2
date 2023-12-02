import { Button, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../navigation/AppContext';
const WelcomeGuess = (props) => {
  const { navigation } = props;
  const { infoUser,setinfoUser } = useContext(AppContext);
  const { isLogin,setIsLogin } = useContext(AppContext);
  const goLogin = async () => {
    //await AsyncStorage.setItem('isLoginGuess', 'false');
    await AsyncStorage.setItem('isLoginGuess', 'true');
    console.log('Trạng thái đăng nhập đã được lưu.');
    navigation.navigate('HomeDemo')
  }
  const goDemo = async () => {
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
          setinfoUser(infoUserObject)
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
    <View>
      <Button title='Bắt đầu' onPress={goLogin}></Button>
      <Button title='Đăng nhập' onPress={goDemo}></Button>
    </View>
  )
}

export default WelcomeGuess

const styles = StyleSheet.create({})