import { StyleSheet, Text, View, yourColorVariable, Image,TouchableOpacity, Pressable, TextInput } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign"

const color_arrow = "#2E2E5D";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const log_outcolor = "#F77A55";
const ProfileScreen = (props) => {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon onPress={() => navigation.goBack()} style={styles.icon_arrow} name='arrowleft' color={color_arrow} />
                <Text style={styles.txt_settings}>Settings</Text>
                <Text style={{color:color_view}}>Save</Text>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
                <View style={styles.avatar}>
                    <Image source={require('../assets/images/avt2.png')} />
                </View>
                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Display Name</Text>
                <TextInput style={styles.body2} placeholder='John Doe'></TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Username</Text>
                <TextInput style={styles.body2} placeholder='johndoe'></TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Email Name</Text>
                <TextInput style={styles.body2} placeholder='john@mail.com'></TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Phone</Text>
                <TextInput style={styles.body2} placeholder='+1234567890'></TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Date Birth</Text>
                <TextInput style={styles.body2} placeholder='+01 January 2001'></TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            
        </View>
    )
}

export default ProfileScreen

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
        flexDirection:'row', justifyContent:'center',
        padding:10

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
        paddingLeft: 40,
        flexDirection:'row'

    },
    body1: {
        width:90,
        fontFamily: 'Ponppins',
        fontSize: 14,
        paddingTop:20,
        fontStyle: 'normal',
        fontWeight: '500',
        color: color_arrow
    }
    ,
    body2: {
        paddingLeft:60
    },button:{
        width:330,
        height:60,
        borderWidth:1,
        borderRadius:10,
        borderColor:log_outcolor,
        justifyContent: 'center'


    }
})