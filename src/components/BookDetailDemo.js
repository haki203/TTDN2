/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, Button, Modal, ActivityIndicator, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/FontAwesome';
import AxiosIntance from '../axios/AxiosIntance';
import { URI } from '../../server/public/assets/vendor/tinymce/tinymce';
import ItemListRelate from './ItemFlatList/ItemListRelate';
const { width, height } = Dimensions.get('window');

const BookDetailDemo = (props) => {
    //const { infoUser } = useContext(AppContext);
    const [, updateState] = useState();
    const scrollViewRef = useRef()
    // Hàm để buộc render lại màn hình
    const forceUpdate = () => updateState({});
    const { itemId } = props.route.params;
    const route = props.route;
    const [authorData, setAuthorData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [numCmt, setNumCmt] = useState(0);
    const [tbRate, setTbRate] = useState(0);
    const [dataCmt, setDataCmt] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [RelateData2, setRelateData2] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const { navigation } = props;
    const [heightView, setHeightView] = useState(0);
    const [showFullText, setShowFullText] = useState(false);
    const AuthorBook = async (id) => {
        //setIsLoading(true);
        const response = await AxiosIntance().get("/product/author/" + id)
        const Data1 = {
            authorname: response.author.name,
            introduce: response.author.introduce,
        }
        setAuthorData(Data1);
    }
    const DetailBook = async () => {
        const response = await AxiosIntance().get("/product/" + itemId)
        const Data2 = {
            id: response.product._id,
            title: response.product.title,
            image: response.product.image,
            description: response.product.description,
            rate: response.product.rate,
            category: response.product.categoryId,
        }
        setBookData(Data2);
        AuthorBook(response.product.authorId)
        Relate(response.product.categoryId)

        // ---------------------
        console.log("------dang goi api getHeart-----");

        
        //------------------
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)

        console.log("đang reload ne----------------");
        forceUpdate()
        scrollViewRef.current.scrollTo({ y: 0, animated: true });

        DetailBook();

    }, [route.params]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         DetailBook();

    //         return () => {
    //             // Cleanup code (optional) when the screen loses focus
    //         };
    //     }, [])
    // );
    const Relate = async (category) => {
        //setIsLoading(true);
        const response = await AxiosIntance().get('/product/get-by-category/' + category);
        const dataa = response.product;
        let datarelate = [];
        for (let i = 0; i < dataa.length; i++) {
            datarelate.push(dataa[i]);

        }
        setRelateData2(datarelate);

        // setIsLoading(false)
    }


    const handleStarPress = (newRating) => {
        setRating(newRating);
    };



    // const { isTabVisible, setIsTabVisible } = useContext(AppContext);
    const longText = "Cuốn sách này thật sự xuất sắc! Nội dung sâu sắc, ngôn ngữ tinh tế và tạo cảm xúc mạnh mẽ. Đây là một tác phẩm đáng đọc và để lại ấn tượng sâu sắc.Đó là 1 quyển sách tuyệt vời.";
    const Read = () => {
        navigation.navigate('ReadDemo', { id: bookData.id})
    }
    const Play = () => {
        navigation.navigate('PlayDemo', { id: bookData.id })
    }
    const Back = useCallback(() => {
        if (route.params && route.params.fromItem) {
            // Nếu từ màn hình Item navigate đến Detail, thì quay lại màn hình Item
            navigation.goBack(null); // Sử dụng null để tránh quay lại màn hình trước đó (Item)
        } else {
            // Nếu không, thì quay lại màn hình Home
            navigation.goBack();
        }
    }, [route.params, navigation]);

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };

    const [isHearted, setIsHearted] = useState(false);


    const [isDobModalVisible, setDobModalVisible] = useState(false);
    const [isDobModalVisible1, setDobModalVisible1] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

 

    const [rating, setRating] = useState(0);

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleStarPress(i)}
                >
                    <Text style={i <= rating ? styles.filledStar : styles.emptyStar}>★</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <View style={styles.Container} >
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size={35} color={'black'} /></View>) : (<View></View>)}
            <View style={styles.Icon_Container}>
                <TouchableOpacity onPress={Back}>
                    <Icon_1 name="chevron-back" size={30} color="black" />
                </TouchableOpacity>

            </View>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                <View style={styles.Image_Container}>
                    <View>
                        <Image style={styles.View_Image} source={{ uri: bookData.image }} />
                    </View>
                    <View>
                        <Text style={styles.View_Text1}>{bookData.title}</Text>
                        <Text style={styles.View_Text2}>{authorData.authorname}</Text>
                    </View>
                    <View style={styles.View_Danhgia}>
                        <View style={styles.Star}>
                            {tbRate > 4.99 ? (
                                <View style={styles.Star}>
                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                </View>
                            ) : (
                                <View >
                                    {tbRate > 4.2 && tbRate < 4.99 ? (
                                        <View style={styles.Star}>
                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                            <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={18} color="#FFCC00" />
                                        </View>
                                    ) : (
                                        <View>
                                            {tbRate >= 3.7 && tbRate < 4.2 ? (
                                                <View style={styles.Star}>
                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                </View>
                                            ) : (
                                                <View>
                                                    {tbRate >= 3.2 && tbRate < 3.7 ? (
                                                        <View style={styles.Star}>
                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                            <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={18} color="#FFCC00" />
                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                        </View>
                                                    ) : (
                                                        <View>
                                                            {tbRate >= 2.7 && tbRate < 3.2 ? (
                                                                <View style={styles.Star}>
                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                                </View>
                                                            ) : (
                                                                <View>
                                                                    {tbRate >= 2.2 && tbRate < 2.7 ? (
                                                                        <View style={styles.Star}>
                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                            <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={18} color="#FFCC00" />
                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                                        </View>
                                                                    ) : (
                                                                        <View>
                                                                            {tbRate >= 1.7 && tbRate < 2.2 ? (
                                                                                <View style={styles.Star}>
                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />

                                                                                </View>
                                                                            ) : (
                                                                                <View>
                                                                                    {tbRate >= 1.2 && tbRate < 1.7 ? (
                                                                                        <View style={styles.Star}>
                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                                            <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={18} color="#FFCC00" />
                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                        </View>
                                                                                    ) : (
                                                                                        <View>
                                                                                            {tbRate >= 0.7 && tbRate < 1.2 ? (
                                                                                                <View style={styles.Star}>
                                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#FFCC00" />
                                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                    <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                </View>
                                                                                            ) : (
                                                                                                <View>
                                                                                                    {tbRate >= 0.1 && tbRate < 0.7 ? (
                                                                                                        <View style={styles.Star}>
                                                                                                            <Icon_2 style={styles.Star_Danhgia} name="star-half-full" size={18} color="#FFCC00" />
                                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                            <Icon_2 style={styles.Star_Danhgia1} name="star" size={18} color="#CDCDCD" />
                                                                                                        </View>
                                                                                                    ) : (
                                                                                                        <View style={styles.Star}>
                                                                                                            <Text style={styles.Text_MoTa1}>Chưa có đánh giá</Text>
                                                                                                        </View>
                                                                                                    )}

                                                                                                </View>
                                                                                            )}

                                                                                        </View>
                                                                                    )}

                                                                                </View>
                                                                            )}

                                                                        </View>
                                                                    )}

                                                                </View>
                                                            )}

                                                        </View>
                                                    )}

                                                </View>
                                            )}

                                        </View>
                                    )}

                                </View>
                            )}


                        </View>
                    </View>
                    <Text style={styles.Text_DocGia}>{tbRate !== 0 ? tbRate : null}</Text>
                </View>
                <View style={styles.View_MoTa}>
                    <View>
                        <Text style={styles.Text_MoTa1}>Giới thiệu về tác giả</Text>
                        <Text style={styles.Text_MoTa2}>{authorData.introduce}</Text>
                    </View>
                    <View style={styles.View_Text3}>
                        <Text style={styles.Text_MoTa1}>Tổng quan về sách</Text>
                        <Text style={styles.Text_MoTa2}>{bookData.description}</Text>
                    </View>
                </View>
                <View style={styles.View_Click}>
                    <TouchableOpacity onPress={Read} style={styles.View_Click1}>
                        <Icon_1 name="document-text" size={16} color="white" />
                        <Text style={styles.Text_Click}>Đọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.View_Click1} onPress={Play}>
                        <Icon_1 name="play-circle" size={16} color="white" />
                        <Text style={styles.Text_Click}>Nghe</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.Separator}></View>
                <View style={styles.View_SachLienQuan}>
                    <Text style={styles.Text_BinhLuan}>Những sách liên quan</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={RelateData2}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        renderItem={({ item }) => <ItemListRelate dulieu={item} navigation={navigation} />}
                    />
                </View>
            </ScrollView >
        </View >
    )
}

export default BookDetailDemo;
// export const DetailBookCC = async (itemId) => {
//     const response = await AxiosIntance().get("/product/" + itemId)
//     const Data2 = {
//         id: response.product._id,
//         title: response.product.title,
//         image: response.product.image,
//         description: response.product.description,
//         rate: response.product.rate,
//         category: response.product.categoryId,
//     }
//     setBookData(Data2);
//     AuthorBook(response.product.authorId)
//     Relate(response.product.categoryId)
//     Comment(response.product._id)

//     // ---------------------
//     console.log("------dang goi api getHeart-----");

//     const res = await AxiosIntance().get("/product/favourite/get-book-by-user/" + infoUser.id);
//     console.log("Sách nè: ", res);
//     console.log("id sach detail ne ", Data2.id);
//     for (let index = 0; index < res.data.length; index++) {
//         console.log("id sach api ne ", res.data[index].favourite.bookId);
//         if (res.data[index].favourite.bookId == Data2.id) {
//             setIsHearted(true);
//             console.log("id sach trung ne ", res.data[index].favourite.bookId);
//             return;
//         }
//         else {
//             setIsHearted(false);
//         }
//     }
//     //------------------
//     setIsLoading(false)
// }
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: { width: width, height: height, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },
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
        marginTop: 10,
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
        justifyContent: 'center'
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
        textAlign: 'center',
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
        textAlign: 'justify',
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
        marginTop: 5,
        width: '25%',
        height: '100%',
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
        width: '50%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#FAF9F9',
        elevation: 2,
    },
    View_Cmt_Star: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    View_NoiDung: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    View_Danhgiane1: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    View_Danhgiane2: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text_Cmt: {
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#272956',
        fontSize: 24,
        paddingLeft: 5,
    },
    Text_Cmt1: {
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
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
        textAlign: 'center',
        paddingTop: 5,
    },
    Text_Danhgia11: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
        textAlign: 'center',
    },
    Text_Danhgia12: {
        fontWeight: '800',
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#272956',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    View_DocGia: {
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        padding: 20,
        marginTop: 15,
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
        marginBottom: 5
    },
    View_NoiDung_DocGia: {
        flexDirection: 'row',
    },
    Star: {
        flexDirection: 'row',
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
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15
    },
    View_SachLienQuan: {
        padding: 20
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        height: '92%',
        position: 'absolute',
        bottom: 0,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 16,
        color: 'black',
    },
    input1: {
        height: 100,
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
        paddingRight: 10,
    },
    button_text: {
        color: '#272956',
        height: 40,
        textAlign: 'center',
        paddingTop: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    button_text11: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
    },
    label: {
        fontSize: 18,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filledStar: {
        color: '#272956',
        fontSize: 40,
        margin: 10
    },
    emptyStar: {
        color: '#CDCDCD',
        fontSize: 40,
        margin: 10

    },
    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
});

