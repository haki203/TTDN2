import { StyleSheet, Text, View, yourColorVariable, Image, TouchableOpacity, Pressable, TextInput, ToastAndroid, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/AntDesign';
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

const log_outcolor = "#F77A55";
const ProfileScreen = (props) => {
    const { navigation } = props;
    const { infoUser, setinfoUser } = useContext(AppContext);
    const [image, setshowImage] = useState('')
    console.log(infoUser);
    const capture = async () => {
        const result = await launchCamera();
        console.log(result.assets[0].uri);
        setshowImage(result.assets[0].uri);
        console.log("hinh ne: ", result.assets[0].uri);
    };

    const getImageLibrary = async () => {
        const result = await launchImageLibrary();
        console.log(result.assets[0].uri);
        setshowImage(result.assets[0].uri);


        const imageUri = result.assets[0].uri;
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref('images/' + filename);
        const task = storageRef.putFile(imageUri);

        task.on('state_changed', snapshot => {

        }, error => {
            console.error('Firebase storage error:', error);
        }, async () => {
            // up thành công dowload link ảnh về
            const downloadURL = await storageRef.getDownloadURL();
            console.log('File available at:', downloadURL);

            // sửa dụng dowmloadURL để update thông tin 
            setinfoUser({ ...infoUser, avatar: downloadURL });
        });
    };

    const updateProfile = async () => {
        try {
            const response = await AxiosIntance().post("/user/update-user", { id: infoUser.id, name: infoUser.name, email: infoUser.email, phone: infoUser.phone, avatar: infoUser.avatar })
            if (response.result == true) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log("loi ne: ", error);
        }

    }

    const [tempName, setTempName] = useState(infoUser.name);
    const [isModalVisible, setModalVisible] = useState(false);
    const handleSave = async ()  => {
        setModalVisible(false);
        try {
            setinfoUser({ ...infoUser, name: tempName });
    
            const response = await AxiosIntance().post("/user/update-user", {
                id: infoUser.id,
                name: tempName,
                email: infoUser.email,
                phone: infoUser.phone,
                avatar: infoUser.avatar
            });
    
            if (response.result === true) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Lỗi ne: ", error);
            // Xử lý lỗi tại đây (hiển thị thông báo lỗi hoặc thực hiện các bước khác)
        }
    };
    const handleCancel = () => {
        setModalVisible(false);
        setTempName(infoUser.name);
    };

    const [tempEmail, setTempEmail] = useState(infoUser.email);
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const handleEmailSave = async ()  => {
        setEmailModalVisible(false);
        try {
            setinfoUser({ ...infoUser, email: tempEmail });
    
            const response = await AxiosIntance().post("/user/update-user", {
                id: infoUser.id,
                name: infoUser.name,
                email: tempEmail,
                phone: infoUser.phone,
                avatar: infoUser.avatar
            });
    
            if (response.result === true) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Lỗi ne: ", error);
            // Xử lý lỗi tại đây (hiển thị thông báo lỗi hoặc thực hiện các bước khác)
        }
    };
    const handleEmailCancel = () => {
        setEmailModalVisible(false);
        setTempEmail(infoUser.email);
    };

    const [tempPhone, setTempPhone] = useState(infoUser.phone);
    const [isPhonelModalVisible, setPhoneModalVisible] = useState(false);
    const handlePhoneSave = async () => {
        setPhoneModalVisible(false);
        try {
            setinfoUser({ ...infoUser, phone: tempPhone });
    
            const response = await AxiosIntance().post("/user/update-user", {
                id: infoUser.id,
                name: infoUser.name,
                email: infoUser.email,
                phone: tempPhone,
                avatar: infoUser.avatar
            });
    
            if (response.result === true) {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Lỗi ne: ", error);
            // Xử lý lỗi tại đây (hiển thị thông báo lỗi hoặc thực hiện các bước khác)
        }
    };
    const handlePhoneCancel = () => {
        setPhoneModalVisible(false);
        setTempPhone(infoUser.phone);
    };

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
            {/* <View style={styles.header}>
                <Icon onPress={() => navigation.goBack()} style={styles.icon_arrow} name='arrowleft' color={color_arrow} />
                <Text style={styles.txt_settings}>Thông tin người dùng</Text>
                <TouchableOpacity onPress={updateProfile}>
                    <Text style={{ color: color_view, fontWeight: '500' }}>Lưu</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}>
            </View>

            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: infoUser.avatar }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.uploadIcon} onPress={getImageLibrary}>
                    <Icon_2 name="upload" size={18} color="#FF97A3" />
                </TouchableOpacity>
            </View>

            {/* <View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: infoUser.avatar }} />
                </View>
                <TouchableOpacity style={styles.icon_upload_outside} onPress={getImageLibrary}>
                    <Icon style={styles.icon_upload} name='cloudupload' color={color_upload} />
                </TouchableOpacity>
            </View> */}

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.Text_YourName}>Tên người dùng</Text>
                <View style={styles.View_Container1}>
                    <View style={styles.View_Back2}>
                        <View>
                            <Text style={styles.Text_Back}>{infoUser.name}</Text>
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
                            onChangeText={(text) => setTempName(text)}
                        >{tempName}</TextInput>
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

            {/* <View style={styles.body}>
                <Text style={styles.body1}>Tên người dùng</Text>
                <TextInput style={styles.body2} onChangeText={(text) => setinfoUser({ ...infoUser, name: text })} > {infoUser.name}</TextInput>
            </View> */}

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

            <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
                <Text style={styles.Text_YourName}>Email</Text>
                <View style={styles.View_Container1}>
                    <View style={styles.View_Back2}>
                        <View style={styles.View_Text_Profile}>
                            <Text style={styles.Text_Back}>{infoUser.email}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon_1 name="chevron-forward-outline" size={24} color="#000000" />
                    </View>
                </View>
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={isEmailModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.button_text1}>Chỉnh sửa Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập Email mới"
                            placeholderTextColor='black'
                            onChangeText={(text) => setTempEmail(text)}
                        >{tempEmail}</TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={handleEmailSave} style={styles.button}>
                                <Text style={styles.button_text}>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleEmailCancel} style={styles.button}>
                                <Text style={styles.button_text}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <View style={styles.body}>
                <Text style={styles.body1}>Email </Text>
                <TextInput style={styles.body2} placeholder='john@mail.com' onChangeText={(text) => setinfoUser({ ...infoUser, email: text })}  >{infoUser.email}</TextInput>
            </View> */}

            <View style={{ backgroundColor: '#F5F5FA', height: 2, width: '100%' }}></View>

            <TouchableOpacity onPress={() => setPhoneModalVisible(true)}>
                <Text style={styles.Text_YourName}>Số điện thoại</Text>
                <View style={styles.View_Container1}>
                    <View style={styles.View_Back2}>
                        <View style={styles.View_Text_Profile}>
                            <Text style={styles.Text_Back}>{infoUser.phone}</Text>
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
                            onChangeText={(text) => setTempPhone(text)}
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

    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    uploadIcon: {
        bottom: -30,
        right: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: 32,
        height: 32,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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