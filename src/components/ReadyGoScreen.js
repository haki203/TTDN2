import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../navigation/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const ReadyGoScreen = (props) => {
  const { navigation } = props
  const { isLogin, setIsLogin } = useContext(AppContext);
  const login = async () => {
    try {
      // Lưu trạng thái đăng nhập vào AsyncStorage
      await AsyncStorage.setItem('isLoginGuess', 'true');
      console.log('Trạng thái đăng nhập đã được lưu.');
      // Chuyển đến màn hình HomeDemo
      navigation.navigate('HomeDemo');
    } catch (error) {
      console.error('Lỗi khi lưu trạng thái đăng nhập:', error);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Image style={{ height: height / 2.2 }} source={require('../assets/images/Study.png')}></Image>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 38, marginHorizontal: 170 }}>
        <View style={{ width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 26, height: 6, backgroundColor: '#D55555', borderRadius: 3 }} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.content}>You are ready to go!</Text>
        <Text style={styles.content_1}>Congratulation, any interesting topics will be shortly in your hands.</Text>
      </View>
      <View style={{ alignItems: 'center', position: 'absolute', end: '50%', bottom: height * 0.08, start: '50%' }}>
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ReadyGoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    marginTop: 25
  },
  content: {
    textAlign: 'center',
    color: '#2E2E5D',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18,
    marginTop: height * 0.1,
    alignSelf: 'stretch',
    width: width,
    fontFamily: 'Poppins'
  },
  content_1: {
    width: 250,
    color: '#2E2E5D',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    fontFamily: 'Poppins'
  },
  button: {
    padding: 15,
    backgroundColor: '#D45555',
    borderRadius: 10,
    width: 140,
    alignItems: 'center'
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18
  }
})