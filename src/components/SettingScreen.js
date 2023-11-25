import { StyleSheet, Text, View, yourColorVariable, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Icon from "react-native-vector-icons/AntDesign"
import Icon_1 from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../navigation/AppContext'

const color_arrow = "#2E2E5D";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const log_outcolor = "#F77A55";
const SettingScreen = (props) => {
    const { navigation } = props;
    const { infoUser, setIsLogin } = useContext(AppContext);
    const { isTabVisible, setIsTabVisible } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <View style={styles.View_Container}>
                <View >
                    <TouchableOpacity style={styles.View_Back1} onPress={() => navigation.goBack()}>
                        <View>
                            <Icon_1 style={{ color: '#000000' }} name="chevron-back" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.Text_Back1}>Cài đặt</Text>
                </View>
                <View></View>
            </View>
            {/* <View style={styles.header}>
                <Icon onPress={() => navigation.goBack()} style={styles.icon_arrow} name='arrowleft' color={color_arrow} />
                <Text style={styles.txt_settings}>Cài đặt</Text>
            </View> */}
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>

            <View style={styles.View_ThongTin}>
                <View>
                    <Image style={styles.Image_avt} source={{ uri: infoUser.avatar }} />
                </View>
                <View>
                    <View style={styles.thongtin}>
                        <Text style={styles.Text_Name}>{infoUser.name}</Text>
                        <Text style={styles.Text_Email}>{infoUser.email}</Text>
                    </View>
                </View>
            </View>

            {/* <View style={styles.view_profile}>
                <View style={styles.avatar}>
                    <Image style={{ width: 77, height: 77, borderRadius: 60 }} source={{ uri: infoUser.avatar }} />
                </View>
                <View style={styles.name_profile}>
                    <Text style={styles.name}>{infoUser.name}</Text>
                    <Text onPress={() => navigation.navigate('Profile')} style={styles.name_view}>Xem thông tin chi tiết</Text>
                </View>
            </View> */}
            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={styles.body}>
                    <Text style={styles.body1}>Thông tin cá nhân</Text>
                </View>
            </TouchableOpacity>

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>

            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Tùy chọn giao diện</Text>
            </View>

            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>

            <View style={styles.body}>
                <Text style={styles.body1}>Cài đặt âm thanh</Text>
            </View>

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>

            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Cài đặt thông báo</Text>
            </View>

            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>
            {/* <View style={styles.body}>
                <Text style={styles.body1}>Thông tin ứng dụng</Text>
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
                <Pressable style={styles.button} onPress={() => setIsLogin(false)}>
                    <Text style={{ textAlign: 'center', color: log_outcolor }}>Đăng xuất</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: bgcolor
    },

    View_Container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
    },
    View_Back1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text_Back: {
        fontSize: 16,
        color: '#000000',
    },
    Text_Back1: {
        fontSize: 16,
        color: '#000000',
    },

    View_ThongTin: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Image_avt: {
        width: 70,
        height: 70,
        borderRadius: 45,
        marginLeft: 20,
    },
    Text_Name: {
        fontSize: 16,
        color: 'black',
        marginLeft: 20,
    },
    Text_Email: {
        fontSize: 14,
        color: 'black',
        marginLeft: 20,
    },

    header: {
        display: 'flex',
        width: '100%',
        height: 90,
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 36,
        alignitems: 'flex-start',
        gap: 16,
        flexshrink: 0,
        flexDirection: 'row'
    },
    icon_arrow: {
        fontSize: 20,
        fontFamily: 'Poppins',
    },
    txt_settings: {
        width: 245,
        height: 24,
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: color_arrow,
    }, view_profile: {
        width: '100%',
        height: 100,
        paddingTop: 16,
        paddingLeft: 32,
        flexDirection: 'row',
    }, avatar: {
        display: 'flex',
        width: 72,
        height: 72,

    }, name_profile: {
        height: 47,
        justifyContent: 'space-around',
        marginTop: 10,
        marginLeft: 25

    },
    name: {
        fontFamily: 'Ponppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: color_arrow,
    }, name_view: {
        color: color_view,

    },
    body: {
        width: '100%',
        height: 60,
        paddingLeft: 32,
        paddingTop: 20,

    },
    body1: {
        fontFamily: 'Ponppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: color_arrow
    }, button: {
        width: 330,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        borderColor: log_outcolor,
        justifyContent: 'center'


    }
})