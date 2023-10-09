import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/AntDesign';
import Icon_3 from 'react-native-vector-icons/FontAwesome';
import Icon_4 from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');

const Detail = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
    };

    const maxOpacity = 0.8; // Độ mờ tối đa bạn muốn cho view1
    const opacity = Math.min(scrollY / 100, maxOpacity);

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };

    const [isHearted, setIsHearted] = useState(false);

    const handleHeartPress = () => {
        setIsHearted(!isHearted);
    };

    return (
        <ScrollView style={{ width: width, height: height }} onScroll={handleScroll} scrollEventThrottle={16}>
            <View style={styles.container}>
                {/* <View style={[styles.Header_Container, { opacity: 1 - opacity }]}>
                    <View style={styles.icon_Container}>
                        <View>
                            <TouchableOpacity>
                                <Icon_1 name="chevron-back" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.icon_1}>
                            <View style={styles.icon_1_1}>
                                <TouchableOpacity onPress={handleHeartPress}>
                                    <Icon_3 name={isHearted ? 'bookmark' : 'bookmark-o'} size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon_1 name="share-social" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.SachNoi_Container}>
                        <Icon_1 name="book-outline" size={20} color="white" />
                        <Text style={styles.SachNoi_1}>SÁCH NÓI</Text>
                    </View>
                    <View style={styles.TieuDe_Container}>
                        <Text style={styles.Tieude_1}>Hai Vạn Dặm Dưới Đáy Biển</Text>
                        <View style={styles.Tieude_2}>
                            <Text style={styles.Tieude_3}>Tác giả:</Text>
                            <TouchableOpacity>
                                <View style={styles.Tieude_2}>
                                    <Text style={styles.Tieude_2_1}>Jules Verne</Text>
                                    <Icon_2 style={styles.Tieude_2_2} name="right" size={15} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.Danhgia_Container}>
                        <View style={styles.Danhgia_1}>
                            <Icon_3 style={styles.Danhgia_1_1} name="star" size={25} color="white" />
                            <Icon_3 style={styles.Danhgia_1_1} name="star" size={25} color="white" />
                            <Icon_3 style={styles.Danhgia_1_1} name="star" size={25} color="white" />
                            <Icon_3 style={styles.Danhgia_1_1} name="star" size={25} color="white" />
                            <Icon_3 style={styles.Danhgia_1_1} name="star-half-full" size={25} color="white" />
                            <Text style={styles.Danhgia_1_2}>4.5 (136 lượt đánh giá)</Text>
                        </View>
                    </View>
                    <View style={styles.NgheFree_Container}>
                        <TouchableOpacity style={{ width: '100%' }}>
                            <View style={styles.NgheFree_1}>
                                <Icon_4 name="play" size={25} color="white" />
                                <Text style={styles.NgheFree_1_1}>Nghe chương đầu miễn phí</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View style={styles.view2Container}>
                    <View style={[styles.Content_Container, { marginTop: -scrollY }]}>
                        <View style={styles.Detail_Container}>
                            <Text style={styles.Detail_1}>Giới thiệu nội dung</Text>
                            <Text style={styles.Detail_2}>
                                Trong chuyến săn tìm một sinh vật biển kì lạ, đoàn thám hiểm của giáo sư Pierre Aronnax bất ngờ bị “sinh vật biển” ấy nuốt thẳng vào bụng! Họ đâu có biết rằng đó là một cơ hội tuyệt vời để chu du khắp các đại dương cùng thuyền trưởng Nemo trong chiếc tàu ngầm Nautilus sau này.
                                {showMore && (
                                    <Text>
                                        {' '}
                                        Đó là một chuyến phiêu lưu thú vị với những phát minh kì lạ, những cuộc chạm trán bất ngờ và những bí mật li kì,… Tất cả đều tạo nên một sức hút riêng của “Hai vạn dặm dưới đáy biển” hay (“Hai vạn dặm dưới biển”
                                    </Text>
                                )}
                            </Text>
                            <TouchableOpacity onPress={toggleShowMore} style={styles.toggleButton}>
                                <Text style={styles.toggleButtonText_1}> {showMore ? 'Thu gọn' : 'Xem thêm'} </Text>
                                <Icon_2 style={styles.toggleButtonText_2} name={showMore ? 'up' : 'down'} size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.ThoiLuong_Container}>
                            <View style={styles.Time}>
                                <Icon_1 name="time-outline" size={25} color="black" />
                                <Text style={styles.Time_1}>3 giờ 00 phút</Text>
                            </View>
                            <View style={styles.Time}>
                                <Icon_3 style={styles.Time_2} name="home" size={25} color="black" />
                                <Text style={styles.Time_1}>Alphabooks</Text>
                            </View>
                        </View> */}
                        {/* <View style={styles.ThoiLuong_Container}>
                            <TouchableOpacity>
                                <View style={styles.TheLoai}>
                                    <Text style={styles.TheLoai_1}>Kinh Doanh</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.TheLoai}>
                                    <Text style={styles.TheLoai_1}>Phiêu Lưu</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.TheLoai}>
                                    <Text style={styles.TheLoai_1}>Lãnh Đạo</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}
                        {/* <View style={styles.Separator}></View> */}
                        {/* <View style={styles.Comment_Container}>
                            <Text style={styles.Comment_1}>Bình luận</Text>
                            <View style={styles.Comment_2}>
                                <Image style={styles.Comment_2_1} source={require('../assets/images/hvddb.jpg')} />
                                <View style={styles.Danhgia_Comment}>
                                    <View style={styles.Danhgia_Comment_1}>
                                        <Text style={styles.Danhgia_Comment_3}>4.5</Text>
                                        <Icon_3 style={styles.Danhgia_Comment_2} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Danhgia_Comment_2} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Danhgia_Comment_2} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Danhgia_Comment_2} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Danhgia_Comment_2} name="star-half-full" size={20} color="white" />
                                        <Text style={styles.Danhgia_Comment_3}>( 136 )</Text>
                                    </View>
                                    <View style={styles.Danhgia_Comment_1}>
                                        <View>
                                            <Text style={styles.Danhgia_Comment_4}>4.4/5.0</Text>
                                            <Text style={styles.Danhgia_Comment_4}>NỘI DUNG</Text>
                                        </View>
                                        <View style={styles.verticalLine}></View>
                                        <View>
                                            <Text style={styles.Danhgia_Comment_5}>4.6/5.0</Text>
                                            <Text style={styles.Danhgia_Comment_5}>GIỌNG ĐỌC</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> */}
                        {/* <View>
                            <View style={styles.Comment_DocGia}>
                                <View style={styles.icon_Container_1}>
                                    <Text style={styles.Comment_DocGia_7}>Rất hay</Text>
                                    <Icon_2 name="like1" size={25} color="black" />
                                </View>
                                <Text style={styles.Comment_DocGia_8}>BỞI TRẦN THỨC VÀO 26/8/2023</Text>
                                <View style={styles.Comment_DocGia_1}>
                                    <Text style={styles.Comment_DocGia_8}>NỘI DUNG</Text>
                                    <View style={styles.Comment_DocGia_3}>
                                        <Icon_3 style={styles.Comment_DocGia_4} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_4} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_4} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_4} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_4} name="star" size={20} color="white" />
                                    </View>
                                </View>
                                <View style={styles.Comment_DocGia_1}>
                                    <Text style={styles.Comment_DocGia_8}>GIỌNG ĐỌC</Text>
                                    <View style={styles.Comment_DocGia_5}>
                                        <Icon_3 style={styles.Comment_DocGia_6} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_6} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_6} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_6} name="star" size={20} color="white" />
                                        <Icon_3 style={styles.Comment_DocGia_6} name="star" size={20} color="white" />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.Comment_DocGia_2}>Xem tất cả 136 đánh giá</Text>
                            </TouchableOpacity>
                        </View> */}
                        {/* <View style={styles.Separator}></View>
                        <Text style={styles.Mucluc_1}>Mục lục</Text> */}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CC9966',
    },
    view2Container: {
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    Header_Container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    icon_Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    icon_1: {
        flexDirection: 'row',
    },
    icon_1_1: {
        marginRight: 10,
    },
    SachNoi_Container: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    SachNoi_1: {
        color: 'white',
        fontSize: 14,
        paddingLeft: 10,
    },
    TieuDe_Container: {
        paddingLeft: 20,
        flexDirection: 'column',
    },
    Tieude_1: {
        color: 'white',
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
    },
    Tieude_2: {
        flexDirection: 'row',
    },
    Tieude_3: {
        color: 'white',
        fontSize: 20,
        marginTop: 5,
    },
    Tieude_2_1: {
        color: 'white',
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    Tieude_2_2: {
        color: 'white',
        marginTop: 12.5,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    Danhgia_Container: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    Danhgia_1: {
        flexDirection: 'row',
        marginTop: 5,
    },
    Danhgia_1_1: {
        marginLeft: 5,
    },
    Danhgia_1_2: {
        color: 'white',
        fontSize: 15,
        marginTop: 2.5,
        marginLeft: 5,
    },
    NgheFree_Container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        alignItems: 'center',
    },
    NgheFree_1: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8B864E',
        borderRadius: 30,
    },
    NgheFree_1_1: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
    },
    Content_Container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    Detail_Container: {
        flexDirection: 'column',
        paddingTop: 20,
    },
    Detail_1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    Detail_2: {
        paddingTop: 10,
        fontSize: 20,
    },
    toggleButton: {
        flexDirection: 'row',
    },
    toggleButtonText_1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    toggleButtonText_2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
    },
    ThoiLuong_Container: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    Time: {
        flexDirection: 'row',
    },
    Time_1: {
        fontSize: 20,
        marginLeft: 5,
    },
    Time_2: {
        marginLeft: 30,
    },
    TheLoai: {
        flexDirection: 'row',
        height: 50,
        width: 110,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6E7B8B',
        borderRadius: 15,
        marginRight: 10,
    },
    TheLoai_1: {
        color: '#CAE1FF',
        fontSize: 20,
    },
    Separator: {
        marginTop: 15,
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginBottom: 16,
    },
    Comment_1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    Comment_2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    Comment_2_1: {
        marginTop: 10,
        width: 80,
        height: 122,
        borderRadius: 10,
    },
    Danhgia_Comment: {
        flexDirection: 'colum',
        marginTop: 5,
        height: 170,
        backgroundColor: '#708090',
        flex: 1,
        marginLeft: 10,
        borderRadius: 20,
    },
    Danhgia_Comment_1: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    Danhgia_Comment_2: {
        marginLeft: 5,
        marginTop: 8,
    },
    Danhgia_Comment_3: {
        color: 'white',
        fontSize: 18,
        marginTop: 5,
        marginLeft: 5,
    },
    Danhgia_Comment_4: {
        color: 'white',
        marginLeft: 5,
        fontSize: 15,
        marginTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    Danhgia_Comment_5: {
        color: 'white',
        marginLeft: 15,
        fontSize: 15,
        marginTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    verticalLine: {
        marginLeft: 15,
        width: 1,
        height: '100%',
        backgroundColor: 'black',
    },
    Comment_DocGia: {
        flexDirection: 'colum',
        height: 150,
        width: '100%',
        marginTop: 15,
        backgroundColor: '#6E7B8B',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    Comment_DocGia_1: {
        flexDirection: 'row',
    },
    Comment_DocGia_2: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FF6699',
        fontFamily: 'bold',
    },
    Comment_DocGia_3: {
        flexDirection: 'row',
        paddingLeft: 10,
    },
    Comment_DocGia_4: {
        marginTop: 7.5,
        marginLeft: 10,
    },
    Comment_DocGia_5: {
        flexDirection: 'row',
    },
    Comment_DocGia_6: {
        marginTop: 7.5,
        marginLeft: 10,
    },
    Comment_DocGia_7: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    Comment_DocGia_8: {
        marginTop: 10,
        fontSize: 15,
        color: 'black',
    },
    icon_Container_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    Mucluc_1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Detail;
