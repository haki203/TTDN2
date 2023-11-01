import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, Button } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/FontAwesome';
import Icon_3 from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../navigation/AppContext'
const { width, height } = Dimensions.get('window');

const BookDetail = (props) => {
    const [showMore, setShowMore] = useState(false);
    const { navigation } = props;
    const [heightView, setHeightView] = useState(0);
    const [showFullText, setShowFullText] = useState(false);
    const { isTabVisible, setIsTabVisible } = useContext(AppContext);
    const longText = "Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.Đó là 1 quyển sách tuyệt vời.";
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

    const imageData = [
        { id: '1', name1: 'Đắc Nhân Tâm', name2: 'Dale Carnegie', source: require('../assets/images/Dac-Nhan-Tam.jpg') },
        { id: '2', name1: 'Hoàng Tử Bé', name2: 'Antoine de Saint-Exupéry', source: require('../assets/images/image.webp') },
        { id: '3', name1: 'The CATCHER in the RYE', name2: 'J.D.Salinger', source: require('../assets/images/bookdetail.png') },
    ];
    return (
        <View style={styles.Container} >
            <View style={styles.Icon_Container}>
                <TouchableOpacity onPress={Back}>
                    <Icon_1 name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHeartPress}>
                    <Icon_2 name={isHearted ? 'bookmark' : 'bookmark-o'} size={30} color="red" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.Image_Container}>
                    <View>
                        <Image style={styles.View_Image} source={require('../assets/images/bookdetail.png')} />
                    </View>
                    <View>
                        <Text style={styles.View_Text1}>Catcher in the Rye</Text>
                        <Text style={styles.View_Text2}>J.D. Salinger</Text>
                    </View>
                    <View style={styles.View_Danhgia}>
                        <Icon_2 style={styles.Star_Danhgia} name="star" size={20} color="#272956" />
                        <Icon_2 style={styles.Star_Danhgia} name="star" size={20} color="#272956" />
                        <Icon_2 style={styles.Star_Danhgia} name="star" size={20} color="#272956" />
                        <Icon_2 style={styles.Star_Danhgia} name="star" size={20} color="#272956" />
                        <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={20} color="#272956" />
                        <Text style={styles.Text_DanhGia}>4.5</Text>
                    </View>
                </View>
                <View style={styles.View_MoTa}>
                    <View>
                        <Text style={styles.Text_MoTa1}>About the author</Text>
                        <Text style={styles.Text_MoTa2}>J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine</Text>
                    </View>
                    <View style={styles.View_Text3}>
                        <Text style={styles.Text_MoTa1}>Overview</Text>
                        <Text style={styles.Text_MoTa2}>The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu lts but is often read by adolescents for its theme of angst, alienation and as a critique......</Text>
                    </View>
                </View>
                <View style={styles.View_Click}>
                    <TouchableOpacity onPress={Read} style={styles.View_Click1}>
                        <Icon_1 name="document-text" size={16} color="white" />
                        <Text style={styles.Text_Click}>Đọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.View_Click1} onPress={() => navigation.navigate('Play')}>
                        <Icon_1 name="play-circle" size={16} color="white" />
                        <Text style={styles.Text_Click}>Nghe</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.View_BinhLuan}>
                    <Text style={styles.Text_BinhLuan}>Bình luận</Text>
                    <View style={styles.View_Cmt}>
                        <Image style={styles.View_ImageBook} source={require('../assets/images/bookdetail.png')} />
                        <View style={styles.View_Cmt_DocGia}>
                            <View style={styles.View_Cmt_Star}>
                                <Text style={styles.Text_Cmt}>4.5</Text>
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                                <Text style={styles.Text_Cmt}>(30)</Text>
                            </View>
                            <View style={styles.View_NoiDung}>
                                <View>
                                    <Text style={styles.Text_Danhgia1}>4.5/5.0</Text>
                                    <Text style={styles.Text_Danhgia1}>NỘI DUNG</Text>
                                </View>
                                <View style={styles.verticalLine}></View>
                                <View>
                                    <Text style={styles.Text_Danhgia1}>4.5/5.0</Text>
                                    <Text style={styles.Text_Danhgia1}>NỘI DUNG</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.View_DocGia}>
                        <Text style={styles.Text_DocGia}>Bởi Trần Thức ngày 09/10/2023</Text>
                        <View style={styles.View_NoiDung_DocGia}>
                            <Text style={styles.Text_NoiDung_DocGia}>Nội dung:</Text>
                            <View style={styles.Star}>
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                            </View>
                        </View>
                        <View style={styles.View_NoiDung_DocGia}>
                            <Text style={styles.Text_NoiDung_DocGia}>Giọng đọc:</Text>
                            <View style={styles.Star1}>
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star" size={20} color="#272956" />
                                <Icon_2 style={styles.Star_Danhgia1} name="star-half-full" size={20} color="#272956" />
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            {showFullText ? (
                                <Text>{longText}
                                    <Text onPress={() => setShowFullText(!showFullText)} style={{ fontWeight: 'bold' }}>{showFullText ? "Ẩn bớt" : "Xem thêm..."}</Text>
                                </Text>
                            ) : (
                                <Text>{longText.substring(0, 120)}...
                                    <Text onPress={() => setShowFullText(!showFullText)} style={{ fontWeight: 'bold' }}>{showFullText ? "Ẩn bớt" : "Xem thêm"}</Text>
                                </Text>
                            )}

                        </View>
                    </View>
                    {
                        (heightView < 1) ?
                            (
                                <TouchableOpacity style={styles.Xem_All} onPress={() => setHeightView(600)}>
                                    <Text style={styles.Xem_All_Cmt}>Xem tất cả đánh giá </Text>
                                    <Icon_2 style={styles.Next} name="caret-down" size={26} color="white" />
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity style={styles.Xem_All} onPress={() => setHeightView(0)}>
                                    <Text style={styles.Xem_All_Cmt}>Ẩn tất cả đánh giá </Text>
                                    <Icon_2 style={styles.Next} name="caret-up" size={26} color="white" />
                                </TouchableOpacity>
                            )
                    }
                </View>
                <View style={{ width: width, height: heightView, marginBottom: 5, alignItems: 'center', }}>
                    {
                        (heightView > 0) ?
                            (
                                <View style={{ width: '90%', backgroundColor: '#d5d5d5', height: '100%', borderRadius: 20, padding: 10 }}>
                                    {/*((--------- Style tại đây này------------ */}

                                    

                                    {/*---------- Style tại đây này------------ ))*/}
                                    <TouchableOpacity style={{ width: '100%', position: 'absolute', bottom: 0 }}
                                        onPress={() => setHeightView(0)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon_2 name="caret-up" size={25} color={'#272956'} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            ) :
                            (
                                <View style={{ display: 'none' }}>
                                </View>
                            )

                    }


                </View>
                <View style={styles.Separator}></View>
                <View style={styles.View_SachLienQuan}>
                    <Text style={styles.Text_BinhLuan}>Những sách liên quan</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={imageData}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <View style={styles.FlatList_View}>
                                <TouchableOpacity>
                                    <Image source={item.source} style={styles.FlatList_Image} />
                                    <Text style={styles.FlatList_Name1}>{item.name1}</Text>
                                    <Text style={styles.FlatList_Name2}>{item.name2}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

            </ScrollView >
        </View >
    )
}

export default BookDetail

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
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
        backgroundColor: '#F4F4F4',
        width: '75%',
        height: '100%',
        borderRadius: 10,
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
        paddingLeft: 5,
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
        padding: 15,
    },
    Text_DocGia: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956'
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
        flexDirection: 'row',
    },
    Star: {
        flexDirection: 'row',
        paddingLeft: 20,
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