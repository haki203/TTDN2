import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryFilterScreen from './CategoryFilterScreen';
const SignUpScreen = (props) => {
  const  {navigation} = props;
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/images/Study.png')}></Image>
      </View>
      <View>
        <Text style={styles.content}>Read your favourite books</Text>
        <Text style={styles.content_1}>All your favourites book in one place, read any book, staying at home, on travelling, or anywhere else</Text>
      </View>
      <View style={{alignItems: 'center'}}>
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
    backgroundColor: '#FDFDFD'
  },
  content: {
    marginHorizontal: 80.5,
    color: '#19191B',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    marginTop: 151
  },
  content_1: {
    width: 300,
    color: '#9D9D9D',
    textAlign: 'center',
    marginHorizontal: 54,
    marginTop: 15,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 69,
    backgroundColor: '#D45555',
    display: 'flex',
    borderRadius: 10,
    marginTop: 63,
  }, 
  textButton:{
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18
  }
})