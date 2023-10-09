import { StyleSheet, Text, View, yourColorVariable, Image,TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign"

const color_arrow = "#2E2E5D";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const log_outcolor = "#F77A55";
const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon style={styles.icon_arrow} name='arrowleft' color={color_arrow} />
                <Text style={styles.txt_settings}>Settings</Text>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.view_profile}>
                <View style={styles.avatar}>
                    <Image source={require('../assets/images/avt.png')} />
                </View>
                <View style={styles.name_profile}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.name_view}>View profile</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>   
            <View style={styles.body}>
            <TouchableOpacity>  
                <Text style={styles.body1}>Notifications</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Data and Storages</Text>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>
            <View style={styles.body}>
                <Text style={styles.body1}>Subscription</Text>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Linked Account</Text>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 28, width: '100%' }}></View>
            <View style={styles.body}>
                <Text style={styles.body1}>About Audibooks</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center',padding:5}}>        
            <Pressable style={styles.button}>
                <Text style={{textAlign:'center',color:log_outcolor}}>Log out</Text>
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
    }, header: {
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
        width: 80,
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
    },button:{
        width:330,
        height:60,
        borderWidth:1,
        borderRadius:10,
        borderColor:log_outcolor,
        justifyContent: 'center'


    }
})