import { StyleSheet, Text, View, yourColorVariable, Image, TouchableOpacity, Pressable, TextInput, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import Icon from "react-native-vector-icons/AntDesign"

const color_arrow = "#2E2E5D";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const txtcolor = "#2E2E5D";
const color_upload = "#FF97A3";
import { AppContext } from '../navigation/AppContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AxiosIntance from '../axios/AxiosIntance';
const log_outcolor = "#F77A55";
const ProfileScreen = (props) => {
    const { navigation } = props;
    const { infoUser, setinfoUser } = useContext(AppContext);
    console.log(infoUser);
    const capture = async () => {
        const result = await launchCamera();
        console.log(result.assets[0].uri);
        setshowImage(result.assets[0].uri);
    };

    const getImageLibrary = async () =>{
        const result = await launchImageLibrary();
        console.log(result.assets[0].uri);
        setshowImage(result.assets[0].uri);


        const formdata = new FormData();
        formdata.append('image',{
            uri: result.assets[0].uri, 
            type:'image/jpeg',
            name:'image.jpg',

        });

        const response = await AxiosIntance('multipart/form-data').post(
            'media/upload',
            formdata,
        );
        console.log(response.data.path);
        
        setinfoUser({...infoUser, avatar: response.data.path});
    };

    const updateProfile = async () =>{
        const response = await AxiosIntance().post("/user/update-user", {full_name: infoUser.name, email: infoUser.email, phone: infoUser.phone, avatar: infoUser.avatar})
        if(response.error == false){
            ToastAndroid.show("Cap nhat thanh cong", Toast.LENGTH_SHORT);
        }else{
            ToastAndroid.show("Cap nhat that bai", Toast.LENGTH_SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon onPress={() => navigation.goBack()} style={styles.icon_arrow} name='arrowleft' color={color_arrow} />
                <Text style={styles.txt_settings}>Thông tin người dùng</Text>
                <TouchableOpacity onPress={updateProfile}>
                <Text style={{ color: color_view, fontWeight: '500' }}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: infoUser.avatar }} />
                </View>
                <TouchableOpacity style={styles.icon_upload_outside} onPress={capture}>
                    <Icon  style={styles.icon_upload} name='cloudupload' color={color_upload} />
                    
                </TouchableOpacity>
                
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Tên người dùng</Text>
                <TextInput style={styles.body2} onChangeText={(text) => setinfoUser({...infoUser, name : text}) } > {infoUser.name}</TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Email </Text>
                <TextInput style={styles.body2} placeholder='john@mail.com' onChangeText={(text) => setinfoUser({...infoUser, email : text}) }  >{infoUser.email}</TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Số điện thoại</Text>
                <TextInput style={styles.body2} placeholder='+1234567890' onChangeText={(text) => setinfoUser({...infoUser, phone : text}) }>{infoUser.phone}  </TextInput>
            </View>
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>
            <View style={styles.body}>
                <Text style={styles.body1}>Ngày tháng sinh</Text>
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
    icon_upload_outside:{
        position:'absolute',
        left:'65%',
        top:'80%'
    },
    icon_upload:{   
        fontSize:30 ,
        
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
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 180,
        height: 180,
        borderRadius: 60,
    },



    name_profile: {
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
        flexDirection: 'row'

    },
    body1: {
        width: 105,
        fontFamily: 'Ponppins',
        fontSize: 14,
        paddingTop: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        color: color_arrow
    }
    ,
    body2: {
        paddingLeft: 40,
        color: txtcolor,
    }, button: {
        width: 330,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: log_outcolor,
        justifyContent: 'center'


    }
})