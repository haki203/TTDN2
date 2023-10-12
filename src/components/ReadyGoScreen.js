import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions} from 'react-native'
import React,{useContext} from 'react'
import { AppContext } from '../navigation/AppContext';
const { width, height } = Dimensions.get('window');
const ReadyGoScreen = (props) => {
  const {navigation} = props
  const {isLogin,setIsLogin} = useContext(AppContext);
  return (
    <View style={styles.container}>
      <View>
        <Image style={{height:height/2.2}} source={require('../assets/images/Study.png')}></Image>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 38, marginHorizontal: 170 }}>
        <View style={{ width: 15, height: 6,backgroundColor: 'rgba(213, 85, 85, 0.15)' , borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 15, height: 6,backgroundColor: 'rgba(213, 85, 85, 0.15)' , borderRadius: 3 }} />
        <View style={{ marginLeft: 4, width: 26, height: 6, backgroundColor: '#D55555', borderRadius: 3 }} />
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={styles.content}>You are ready to go!</Text>
        <Text style={styles.content_1}>Congratulation, any interesting topics will be shortly in your hands.</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setIsLogin(true)} style={styles.button}>
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
    backgroundColor: '#FDFDFD'
  },
  content: {
    textAlign:'center',
    color: '#2E2E5D',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18,
    marginTop: height*0.1,
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
    paddingVertical: 17,
    paddingHorizontal: 69,
    backgroundColor: '#D45555',
    display: 'flex',
    borderRadius: 10,
    marginTop: 93,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 18
  }
})