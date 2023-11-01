import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../navigation/AppContext';

const backgroundleader = '#8CA1D6';
const colorText = '#FFF'
const LoginUser = (props) => {
    const { navigation } = props;
    const { isTabVisible, setIsTabVisible } = useContext(AppContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsTabVisible(false)
        });

        return unsubscribe;
    }, []);
    return (
        <LinearGradient colors={['#4682B4', '#B0C4DE', '#ADD8E6']} style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left}>
                <Icon name="left" size={25} color='white' />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.leader}>
                    <Image style={styles.profile} source={require('../components/tab_view/image/profiles.png')}></Image>
                    <Text style={styles.txt}>Đăng nhập để lưu lại quá trình</Text>
                    <LinearGradient style={styles.btn} colors={['#FFD700', '#FFA500', '#FF8C00']} start={{ x: 1, y: 0.5 }} end={{ x: 0.5, y: 1.75 }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                            <Text style={styles.txt2}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={styles.txt1}>Tạo tài khoản mới</Text>
                </View>
            </View>
        </LinearGradient>
    )
}

export default LoginUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    leader: {
        width: '160%' ,
        height: '30%',
        borderRadius: 20,
        backgroundColor: backgroundleader,
        alignItems: 'center',

    },
    profile: {
        marginTop: -45
    },
    btn: {
        backgroundColor: '#D45555',
        borderRadius: 30,
        paddingVertical: 17, // Tương tự với "padding: 17px 0;"
        paddingHorizontal: 49, // Tương tự với "padding: 0 69px;"
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    txt: {
        marginTop: 17,
        color: colorText,
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        fontWeight: '400'
    },
    txt1: {
        marginTop: 17,
        color: colorText,
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        fontWeight: '400'
    },
    left: {
        width: 40,
        height: 40,
        backgroundColor: '#778899',
        borderRadius: 30,
        position: 'absolute',
        left: 0,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt2: {
        color: colorText,
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        fontWeight: 'bold'
    }
})