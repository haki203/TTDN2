import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const LoginScreen = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };
  const handlePasswordFocus = () => {
    setEmailFocused(false);
    setPasswordFocused(true);
  };
  return (
    <KeyboardAwareScrollView style={{flex:1}}  >
      <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Login</Text>
        <Text style={styles.contentText}>Please sign in to continue</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.textInputContainer,emailFocused && styles.focusedInput]}>
          <Image style={styles.iconInput} source={require('../animation/images/scan.png')} />
          <TextInput
            style={[styles.input]}
            placeholder="Email"
            onFocus={handleEmailFocus}
            onBlur={() => setEmailFocused(false)} />
        </View>
        <View style={[styles.textInputContainer,passwordFocused && styles.focusedInput]}>
          <Image style={styles.iconInput} source={require('../animation/images/scan.png')} />
          <TextInput
            style={[styles.input]}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={handlePasswordFocus}
            onBlur={() => setPasswordFocused(false)} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonLogin}>
          <TouchableOpacity onPress={onPressBtnLogin}>
            <Text style={styles.textButton}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mxhContainer}>
        <TouchableOpacity style={styles.pressMXH}>
          <Image source={require('../animation/images/gg.png')} style={styles.mxhLogo} />
          <Text style={styles.textMXH}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account yet? </Text>
        <TouchableOpacity style={styles.footerPress}>
          <Text style={[styles.footerText, { color: 'blue', fontWeight: 'bold' }]}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
      
    </KeyboardAwareScrollView  > 
  );
};

const onPressBtnLogin = () => {
  // Xử lý sự kiện khi nhấn nút login
  console.log("click");
  // Thêm code xử lý đăng nhập tại đây
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    paddingTop:50,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black'
  },
  contentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingTop:50,
  },
  textInputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    width: width * 0.85,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 2,
  },
  input: {
    width: width * 0.75,
    height: height * 0.062,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal:10,
    fontSize: 18,
  },
  focusedInput: {
    borderBottomColor:'#f58c2a'
  },
  
  iconInput: {
    width: 25,
    height: 25
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',

  },
  buttonLogin: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  mxhContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  pressMXH: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#ccccff',
    padding:10,
    borderRadius:10
  },
  mxhLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  textMXH:{
    fontSize:16
  },
  footerContainer: {
    width: width - 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  footerPress: {
    marginLeft: 5,
  },
});

export default LoginScreen;
