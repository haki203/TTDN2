import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Image, ImageBackground, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
const color = '#FFFFFF';

const WelcomeGuess = (props) => {
    const { navigation } = props;
    const goLogin = () => {

    }
    const goDemo = () => {

    }
    return (

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
                        <TouchableOpacity style={styles.touchableFB} >
                            <Text style={styles.textView_GG} onPress={goDemo}>Bắt đầu</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style={styles.touchableGG} onPress={goLogin}>
                            <Text style={styles.textView_GG}>Đăng nhập</Text>
                        </TouchableOpacity>
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
        color: '#D45555',
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
        height: 63,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D45555',
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
        borderColor: '#D45555',
        flexDirection: 'row',
        marginTop: 20,
      },
      textView_GG: {
        color: color,
        fontSize: 15,
        fontWeight: 'bold',
      },
})