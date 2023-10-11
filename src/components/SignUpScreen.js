import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryFilterScreen from './CategoryFilterScreen';
import { Svg } from 'react-native-svg';
const backroundContainer = '#FDFDFD';
const ColorContent = '#272956';
const ColorContent_1 = '#9D9D9D';
const SignUpScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/images/Study.png')}></Image>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 38, marginHorizontal: 170}}>
        <View style={{ width: 26, height: 6, backgroundColor: '#D55555', borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
      </View>
      <View>
        <Text style={styles.content}>Read your favourite books</Text>
        <Text style={styles.content_1}>All your favourites book in one place, read any book, staying at home, on travelling, or anywhere else</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={styles.button}>
          <Text style={styles.textButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backroundContainer
  },
  content: {
    marginHorizontal: 80.5,
    color: ColorContent,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 24,
    marginTop: 110,
    fontFamily: 'Poppins'
  },
  content_1: {
    width: 300,
    color: ColorContent_1,
    textAlign: 'center',
    marginHorizontal: 54,
    marginTop: 15,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: 'Poppins'
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 69,
    backgroundColor: '#D45555',
    display: 'flex',
    borderRadius: 10,
    marginTop: 63,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18
  }
})