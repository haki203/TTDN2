import { Button, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const WelcomeGuess = (props) => {
  const { navigation } = props;

  const goLogin = async () => {
    navigation.navigate('Sign')
  }
  const goDemo = async () => {
    try {
      // Lưu giá trị 'isLoginGuess' thành 'false'
      await AsyncStorage.setItem('isLoginGuess', 'false');
  
      // Lấy giá trị 'isLoginGuess' sau khi đã lưu
      const savedIsLoginGuess = await AsyncStorage.getItem('isLoginGuess');
      console.log('isLoginGuess is false', savedIsLoginGuess);
  
      //So sánh với chuỗi "false" thay vì giá trị boolean false
      if (savedIsLoginGuess === 'false') {
        navigation.navigate('Chao');
      }
    } catch (error) {
      console.error('Lỗi khi lấy/gán giá trị isLoginGuess:', error);
    }
  }
  useEffect(() => {
    const checkLoginStatus = async () => {
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

    // Gọi hàm kiểm tra trạng thái đăng nhập khi màn hình được hiển thị
    checkLoginStatus();
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