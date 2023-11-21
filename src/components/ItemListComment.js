import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, Button, Modal, } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/FontAwesome';
import Icon_3 from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../navigation/AppContext'
const { width, height } = Dimensions.get('window');

const ItemListComment = (props) => {
    const [showMore, setShowMore] = useState(false);
    const { dulieu, navigation } = props;

    const [showFullText, setShowFullText] = useState(false);
    // const { isTabVisible, setIsTabVisible } = useContext(AppContext);
    // const longText = "Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.Đó là 1 quyển sách tuyệt vời.";
    const Read = () => {
        navigation.navigate('Read')
    }
    const Back = () => {
        navigation.goBack();
    }

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };

    const [isHearted, setIsHearted] = useState(false);

    const handleHeartPress = () => {
        setIsHearted(!isHearted);
    };

    const [isDobModalVisible, setDobModalVisible] = useState(false);




    return (
        <View>
            <View>
                <View style={styles.View_DocGia}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.profile} source={{ uri: dulieu.user.avatar }} />
                        <Text style={styles.Text_DocGia}>{dulieu.user.full_name} </Text>
                    </View>
                    <View style={styles.Star}>
                        {dulieu.rate > 4.5 ? (
                            <View style={styles.Star}>
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                            </View>
                        ) : (
                            <View >
                                {dulieu.rate > 3.5 && dulieu.rate < 4.5 ? (
                                    <View style={styles.Star}>
                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                    </View>
                                ) : (
                                    <View>
                                        {dulieu.rate > 2.5 && dulieu.rate < 3.5 ? (
                                            <View style={styles.Star}>
                                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                            </View>
                                        ) : (
                                            <View>
                                                {dulieu.rate > 1.5 && dulieu.rate < 2.5 ? (
                                                    <View style={styles.Star}>
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                    </View>
                                                ) : (
                                                    <View style={styles.Star}>
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#272956" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                        <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                    </View>
                                                )}

                                            </View>
                                        )}

                                    </View>
                                )}

                            </View>
                        )}

                        <Text style={styles.Text_DocGia}> {dulieu.date}</Text>
                    </View>

                    <View style={styles.View_NoiDung_DocGia}>

                        <Text style={[styles.Text_NoiDung_DocGia, { fontWeight: '700' }]}>Tiêu đề: {dulieu.title}</Text>

                    </View>
                    <View>
                        {dulieu.content.length > 50 ? (
                            showFullText ? (
                                <Text style={{ fontWeight: '400', color: '#272956', fontSize: 16 }}>
                                    Nội dung: {dulieu.content}
                                    <Text onPress={() => setShowFullText(!showFullText)} style={{ fontWeight: 'bold', color: 'black' }}>
                                        {showFullText ? " Ẩn bớt" : "Xem thêm..."}
                                    </Text>
                                </Text>
                            ) : (
                                <Text style={{ fontWeight: '400', color: '#272956', fontSize: 16 }}>
                                    Nội dung: {dulieu.content.substring(0, 50)}...
                                    <Text onPress={() => setShowFullText(!showFullText)} style={{ fontWeight: 'bold', color: 'black' }}>
                                        {" Xem thêm"}
                                    </Text>
                                </Text>
                            )
                        ) : (
                            <Text style={{ fontWeight: '400', color: '#272956', fontSize: 16 }}>
                                Nội dung: {dulieu.content}
                            </Text>
                        )}
                    </View>
                    <Text style={[styles.Text_NoiDung_DocGia, { fontSize: 12, fontWeight: 'bold', textAlign: 'right' }]}>{dulieu.time}</Text>
                    {/* <Text style={styles.Text_NoiDung_DocGia}> {dulieu.likeBy.length}</Text> */}
                </View>
            </View>
        </View>
    )
}

export default ItemListComment

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 5,
        height: '92%',
        position: 'absolute',
        bottom: 0,
    },
    List_Comment: {
        marginTop: 15,
    },
    button_text1: {
        fontSize: 16,
        textAlign: 'center',
    },
    Close: {
        position: 'absolute',
        right: 0,
    },
    Text_Modal_DanhGia: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    Icon_Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    Image_Container: {
        alignItems: 'center',
    },
    View_Image: {
        width: 220,
        height: 320,
        borderRadius: 20,
    },
    profile: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 45,
    },
    View_Text1: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#272956',
    },
    View_Text2: {
        paddingTop: 5,
        fontFamily: 'Poppins',
        fontSize: 18,
        color: '#9D9D9D',
        textAlign: 'center',
    },
    View_Danhgia: {
        flexDirection: 'row',
    },
    Star_Danhgia: {
        paddingTop: 5,
        paddingLeft: 5,
    },
    Text_DanhGia: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 5,
        color: '#272956',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    View_MoTa: {
        padding: 20,
    },
    View_Text3: {
        paddingTop: 10,
    },
    Text_MoTa1: {
        fontFamily: 'Poppins',
        color: '#272956',
        fontSize: 18,
        fontWeight: 'bold',
    },
    Text_MoTa2: {
        fontFamily: 'Poppins',
        color: '#9D9D9D',
        fontSize: 16,
        paddingTop: 10,
    },
    View_Click1: {
        backgroundColor: '#D45555',
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Text_Click: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 7,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    View_Click: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    View_BinhLuan: {
        padding: 20,
        paddingBottom: 5
    },
    Text_BinhLuan: {
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956',
        fontSize: 18,
    },
    View_ImageBook: {
        width: 80,
        height: 120,
        borderRadius: 10,
    },
    View_Cmt: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    View_Cmt_DocGia: {
        flexDirection: 'column',
        width: '75%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#cdcdcd',
    },
    View_Cmt_Star: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    View_NoiDung: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    Text_Cmt: {
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956',
        fontSize: 16,
        paddingLeft: 5,
    },
    Star_Danhgia1: {
        paddingRight: 5,
    },
    verticalLine: {
        marginLeft: 15,
        marginRight: 15,
        width: 1,
        height: '100%',
        backgroundColor: 'black',
    },
    Text_Danhgia1: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#272956',
        textAlign: 'center'
    },
    View_DocGia: {
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        padding: 20,
        marginTop: 15,
    },
    Text_DocGia: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins',
        color: '#272956',
    },
    Text_Review: {
        paddingTop: 10,
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#9D9DA1'
    },
    Xem_All_Cmt: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: '#272956',
        fontWeight: 'bold'
    },
    Xem_All: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    View_NoiDung_DocGia: {
    },
    Star: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    Text_Star: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
    },
    Star1: {
        flexDirection: 'row',
        paddingLeft: 12,
    },
    Next: {
        color: '#272956',
    },
    Text_NoiDung_DocGia: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
    },
    Separator: {
        borderBottomColor: '#272956',
        borderBottomWidth: 0.5,
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
    },
    View_SachLienQuan: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    toggleButtonText_1: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
    },
    toggleButton: {
        flexDirection: 'row',
    },
    FlatList_Image: {
        marginTop: 10,
        width: 145,
        height: 210,
        borderRadius: 10,
    },
    FlatList_Name1: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins',
        textAlign: 'center',
        width: 145,
        color: '#272956'
    },
    FlatList_Name2: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Poppins',
        textAlign: 'center',
        width: 145,
        color: '#272956'
    },
})