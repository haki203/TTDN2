import { StyleSheet, Text, View, ActivityIndicator, yourColorVariable, Image, TouchableOpacity, ImageBackground, Pressable, TextInput, ToastAndroid, Linking, Modal, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/AntDesign';
import Icon_3 from 'react-native-vector-icons/FontAwesome5';
const color_arrow = "#2E2E5D";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const txtcolor = "#2E2E5D";
const color_upload = "#FF97A3";
import { AppContext } from '../navigation/AppContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AxiosIntance from '../axios/AxiosIntance';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import crypto from 'crypto-js';
import moment from 'moment';
import axios from 'axios';


const log_outcolor = "#F77A55";
const ProfileScreen = (props) => {
    const { navigation } = props;
    const { infoUser, setinfoUser } = useContext(AppContext);
    const { IsLogin, setIsLogin } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setshowImage] = useState(false)




    const config = {
        app_id: '2553',
        key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
        endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 99000,
        description: `Tro thanh hoi vien VIP #${transID}`,
        bank_code: 'zalopayapp',
    };


    const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
    order.mac = crypto.HmacSHA256(data, config.key1).toString();
    const goiapi = async () => {
        try {
            const response = await axios.post(config.endpoint, null, { params: order });

            const res = await AxiosIntance().get("/user/payment/" + infoUser.id)
            if (res.result) {
                Linking.openURL(response.data.order_url);
                setIsLoading(true)
                setTimeout(() => {
                    queryAPI();
                }, 20000)

            }

        } catch (error) {
            console.error(error);
        }
    };


    const queryconfig = {
        app_id: '2553',
        key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
        endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
    };

    const app_trans_id = order.app_trans_id;
    const querydata = `${queryconfig.app_id}|${app_trans_id}|${queryconfig.key1}`;
    const mac = crypto.HmacSHA256(querydata, queryconfig.key1).toString();;

    const params = {
        app_id: queryconfig.app_id,
        app_trans_id: app_trans_id,
        mac: mac,
    };

    const queryAPI = async () => {

        try {
            const response = await axios.post(queryconfig.endpoint, null, { params: params });
            const result = response.data;

            if (result.return_code == 1) {
                setIsLoading(false);
                const updatedInfoUser = { ...infoUser };
                updatedInfoUser.premium = true;
                setinfoUser(updatedInfoUser);
                const dataPayment = {
                    userId: infoUser.id,
                    money: order.amount
                }
                const res = await AxiosIntance().post("/user/doanhthu/new/", dataPayment);
                Alert.alert('Thông báo', 'Chúc mừng bạn đã là hội viên', [

                    { text: 'OK', onPress: () => navigation.navigate("Home") },
                ]);
            } else if (result.return_code == 2) {
                ToastAndroid.show("Thanh toán thất bại", ToastAndroid.SHORT);
                setIsLoading(false);
            } else if (result.return_code == 3) {
                ToastAndroid.show("Đang chờ thanh toán", ToastAndroid.SHORT);
            }

        } catch (error) {
            console.error(",,,,,,,,,,,,,,,", error);
        }
    };


    const primium = async () => {
        const res = await AxiosIntance().get("/user/delete-premium/" + infoUser.id);
    }
    const getImageLibrary = async () => {
        const result = await launchImageLibrary();
        console.log(result.assets[0].uri);

        const imageUri = result.assets[0].uri;
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref('images/' + filename);
        const task = storageRef.putFile(imageUri);
        setIsLoading(true);
        task.on('state_changed', snapshot => {

        }, error => {
            console.error('Firebase storage error:', error);
        }, async () => {
            // up thành công dowload link ảnh về
            const downloadURL = await storageRef.getDownloadURL();
            console.log('File available at:', downloadURL);
            setshowImage(downloadURL);

            // sửa dụng dowmloadURL để update thông tin 
            //setinfoUser({ ...infoUser, avatar: downloadURL });
            setIsLoading(false);

        });

    };

    const updateProfile = async () => {
        console.log(name, phone, infoUser.avatar);
        const body = { id: infoUser.id, name: name, email: infoUser.email, phone: phone.toString(), avatar: infoUser.avatar };
        console.log("body ne: ", body);
        try {
            const res1 = await AxiosIntance().post("/user/update-user", { id: infoUser.id, name: name, email: infoUser.email, phone: phone.toString(), avatar: !image ? infoUser.avatar : image })
            console.log(res1);

            const res = await AxiosIntance().post("/user/update-user", { id: infoUser.id, name: name, email: infoUser.email, phone: phone.toString(), avatar: !image ? infoUser.avatar : image })
            if (res.result == true) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
                console.log(res);
                const infoUser = {
                    name: res.user.full_name, avatar: res.user.avatar, id: res.user._id, phone: res.user.phone, email: res.user.email, premium: res.user.premium
                }
                setinfoUser(infoUser)
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log("loi ne: ", error);
            ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
        }

    }

    const [name, setName] = useState(infoUser.name)
    const [phone, setPhone] = useState(infoUser.phone)
    const [avt, setAvt] = useState(infoUser.avatar)


    const [tempName, setTempName] = useState(infoUser.name);
    const [isModalVisible, setModalVisible] = useState(false);
    const handleSave = async () => {
        console.log("ok");
        setModalVisible(false);
        setTempName(name);
    }
    const handleCancel = () => {
        setModalVisible(false);
        // setTempName(infoUser.name);
    };


    const [tempPhone, setTempPhone] = useState(infoUser.phone);
    const [isPhonelModalVisible, setPhoneModalVisible] = useState(false);
    const handlePhoneSave = async () => {
        setPhoneModalVisible(false);
        setTempPhone(phone);

    };
    const handlePhoneCancel = () => {
        setPhoneModalVisible(false);
    };

    console.log(infoUser.premium);

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
                    <Text style={styles.Text_Back1}>Thông tin người dùng</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={updateProfile}>
                        <Text style={styles.Text_Back1}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
                </View>
                <View style={styles.avatarContainer}>
                    {infoUser.premium ? (
                        <TouchableOpacity style={styles.uploadCrown}>
                            <Icon_3 name="crown" size={24} color="#D9D000" />
                        </TouchableOpacity>
                    ) : null}
                    {isLoading ? (
                        <ActivityIndicator size={40} color="grey" style={{ width: 90, height: 90, }} />
                    ) : (
                        <Image
                            source={{ uri: !image ? infoUser.avatar : image }}
                            style={styles.avatar}
                        />
                    )}
                    <TouchableOpacity style={styles.uploadIcon} onPress={getImageLibrary}>
                        <Icon_2 name="upload" size={18} color="#FF97A3" />
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.avatarContainer}>
                    {!infoUser.premium ? (
                        <TouchableOpacity style={styles.uploadCrown}>
                            <Icon_3 name="crown" size={24} color="#D9D000" />
                        </TouchableOpacity>
                    ) : null}
                    <ImageBackground
                        source={{ uri: infoUser.avatar }}
                        style={styles.avatar}
                        imageStyle={styles.avatarImage}
                    >
                        <Image
                            source={require('../assets/images/khung1.png')} // Đường dẫn của hình ảnh viền PNG
                            style={styles.avatarBorder}
                        />
                    </ImageBackground>
                    <TouchableOpacity style={styles.uploadIcon} onPress={getImageLibrary}>
                        <Icon_2 name="upload" size={18} color="#FF97A3" />
                    </TouchableOpacity>
                </View> */}

                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.Text_YourName}>Tên người dùng</Text>
                    <View style={styles.View_Container1}>
                        <View style={styles.View_Back2}>
                            <View>
                                <Text style={styles.Text_Back}>{tempName}</Text>
                            </View>
                        </View>
                        <View>
                            <Icon_1 name="chevron-forward-outline" size={24} color="#000000" />
                        </View>
                    </View>
                </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.button_text1}>Chỉnh sửa tên</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên mới"
                                placeholderTextColor='black'
                                onChangeText={(text) => setName(text)}
                            >{name}</TextInput>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handleSave} style={styles.button}>
                                    <Text style={styles.button_text}>Lưu</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleCancel} style={styles.button}>
                                    <Text style={styles.button_text}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>



                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>



                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>


                <Text style={styles.Text_YourName} onPress={primium}>Số điện thoại</Text>
                <TouchableOpacity onPress={() => setPhoneModalVisible(true)}>
                    <View style={styles.View_Container1}>
                        <View style={styles.View_Back2}>
                            <View style={styles.View_Text_Profile}>
                                <Text style={styles.Text_Back}>{tempPhone}</Text>
                            </View>
                        </View>
                        <View>
                            <Icon_1 name="chevron-forward-outline" size={24} color="#000000" />
                        </View>
                    </View>
                </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={isPhonelModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.button_text1}>Chỉnh sửa số diện thoại</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập số điện thoại mới"
                                placeholderTextColor='black'
                                onChangeText={(text) => setPhone(text)}
                            >{tempPhone}</TextInput>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handlePhoneSave} style={styles.button}>
                                    <Text style={styles.button_text}>Lưu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePhoneCancel} style={styles.button}>
                                    <Text style={styles.button_text}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* <View style={styles.body}>
                <Text style={styles.body1}>Số điện thoại</Text>
                <TextInput style={styles.body2} placeholder='+1234567890' onChangeText={(text) => setinfoUser({ ...infoUser, phone: text })}>{infoUser.phone}  </TextInput>
            </View> */}

                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {!infoUser.premium ? (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 5, width: 330,
                            borderColor: log_outcolor,
                            borderWidth: 1, marginTop: 20,
                            borderRadius: 10, backgroundColor: 'rgba(117, 146, 155, 0.6)',
                            flexDirection: 'column', alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center', color: 'black',
                                fontSize: 18, fontWeight: '500'
                            }}>Trải nghiệm gói hội viên</Text>
                            <Text style={{
                                textAlign: 'center', color: 'black',
                                fontSize: 14
                            }}>Nội dung độc quyền</Text>
                            <TouchableOpacity style={styles.button1} onPress={goiapi}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Mua ngay</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>

                <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5, }}>
                    <TouchableOpacity style={styles.button2} onPress={() => setIsLogin(false)}>
                        <Text style={{ textAlign: 'center', color: log_outcolor }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

    button1: {
        width: 200,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: log_outcolor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F77A55'
    },

    button2: {
        width: 330,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: log_outcolor,
        justifyContent: 'center',
        alignItems: 'center'
    },

    View_Container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
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

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden'
    },
    avatarImage: {
        resizeMode: 'cover', // Đảm bảo hình ảnh avatar không bị biến dạng khi overlay
    },
    avatarBorder: {
        width: '100%',
        height: '100%',
    },
    uploadIcon: {
        bottom: 30,
        right: -30,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadCrown: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    Text_YourName: {
        marginLeft: 16,
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
        marginTop: 10,
    },
    View_Container1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C4C4C4',
    },
    View_Back2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: 350,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 16,
        color: 'black',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        height: 40,
        marginTop: 10,
        marginRight: 10
    },
    button_text: {
        color: 'white',
        backgroundColor: '#FF97A3',
        width: 150,
        height: 40,
        textAlign: 'center',
        paddingTop: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    button_text1: {
        fontSize: 16,
        textAlign: 'center',
    },

    icon_arrow: {
        fontSize: 20,
        fontFamily: 'Poppins',
    },
    icon_upload_outside: {
        position: 'absolute',
        left: '65%',
        top: '80%'
    },
    icon_upload: {
        fontSize: 30,

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 150
    },
    // avatar: {
    //     width: 180,
    //     height: 180,
    //     borderRadius: 60,
    // },



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
        paddingLeft: 20,
        width: '100%',
        height: 100,
        flexDirection: 'column'

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
        color: txtcolor,
    },
    // button: {
    //     width: 330,
    //     height: 60,
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     borderColor: log_outcolor,
    //     justifyContent: 'center'


    // }
})