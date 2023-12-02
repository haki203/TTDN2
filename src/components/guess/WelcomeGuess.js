import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeGuess = (props) => {
    const {navigation}=props;
    const goLogin = () => {

    }
    const goDemo = () => {

    }
    return (

        <View>
            <Button title='Bắt đầu' onPress={goDemo}></Button>
            <Button  title='Đăng nhập' onPress={goLogin}></Button>
        </View>
    )
}

export default WelcomeGuess

const styles = StyleSheet.create({})