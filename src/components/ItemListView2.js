import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import AxiosIntance from '../axios/AxiosIntance';
import { AppContext } from '../navigation/AppContext';


const ItemListView2 = (props) => {
    const { dulieu, navigation, id } = props;
    const [data, setData] = useState([]);
    const { infoUser } = useContext(AppContext);
    const [bookData, setBookData] = useState([]);

    const route = props.route;
    const [isHearted, setIsHearted] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const DetailBook = async () => {
        const response = await AxiosIntance().get("/product/" + dulieu._id)
        const Data2 = {
            id: response.product._id,
            title: response.product.title,
            image: response.product.image,
            description: response.product.description,
            rate: response.product.rate,
            category: response.product.categoryId,
        }
        setBookData(Data2);

        // ---------------------


        const res = await AxiosIntance().get("/product/favourite/get-book-by-user/" + infoUser.id);

        for (let index = 0; index < res.data.length; index++) {

            if (res.data[index].favourite.bookId == Data2.id) {
                setIsHearted(true);

                return;
            }
            else {
                setIsHearted(false);
            }
        }
        //------------------
    }

    useEffect(() => {

        DetailBook();

    }, []);

    const handleHeartPress = async () => {
        // setIsHearted(!isHearted);
        try {
            const favouriteData = {
                idUser: infoUser.id,
                idBook: bookData.id,
            };
            console.log("favouriteData nè: ", favouriteData);
            const response = await AxiosIntance().post("/product/favourite/new/", favouriteData);
            console.log("Data trả về nè: ", response);

            if (response.result) {
                setIsHearted(!isHearted, true);
            }
            else {
                setIsHearted(!isHearted, false);
            }
        } catch (error) {
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.datetime}>
                <View style={styles.date}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#000000', textAlign: 'center', marginTop: 10 }}>
                        26
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', textAlign: 'center' }}>
                        T.8
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyimage}>
                    <Image style={styles.image} source={{ uri: dulieu.image }} />
                    <View style={styles.iconimage}>
                        <Text style={{ color: "#000000", fontFamily: 'Poppins-Medium', fontSize: 13 }} >{dulieu.title}</Text>
                        <Text style={{ marginTop: 3, fontSize: 10, fontFamily: 'Poppins-Medium' }}>Audio Book</Text>
                        <View style={{ width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.click}>
                                <Icon name="playcircleo" size={20} color='black' onPress={() => navigation.navigate('Play')} />
                                <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Poppins-Medium' }}>
                                    Nghe
                                </Text>
                            </View>
                            <View style={styles.click}>
                                <TouchableOpacity onPress={handleHeartPress}>
                                    <View >
                                        <Icon
                                            name={isHearted ? 'heart' : 'hearto'}
                                            size={20}
                                            color={isHearted ? 'black' : 'black'}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {isHearted && <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Poppins-Medium' }}>
                                    Đã thích
                                </Text> || <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Poppins-Medium' }}>
                                        Yêu thích
                                    </Text>}
                            </View>
                            <View style={styles.click}>
                                <Icon name="infocirlceo" size={20} color='black' onPress={() => navigation.navigate('Detail', { itemId: dulieu._id },)} />

                                <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Poppins-Medium' }}>
                                    Chi tiết
                                </Text>
                            </View>

                        </View>


                    </View>
                </View>
                <View style={styles.bodytext}>
                    <Text style={styles.namebook}>Tổng quan về sách</Text>
                    <Text numberOfLines={2} style={styles.content}>{dulieu.description}</Text>
                </View>

            </View>

        </View>
    )
}

export default ItemListView2

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 230,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#f3f3f3',
        paddingTop: 30,
        borderRadius: 25,
    }, datetime: {
        height: 300,
        width: 60
    }, body: {
        height: "100%",
        flexDirection: 'column',
        display: 'flex'
    }, bodyimage: {
        width: '100%',
        height: "auto",
        flexDirection: 'row',
    }
    , iconimage: {
        width: '100%',
        height: "auto",
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 25
    }, date: {
        marginLeft: 12,
        width: 35,
        height: 65,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flexDirection: 'column',
    }, image: {
        width: 75,
        height: 120,
        borderRadius: 10,
    }, click: {
        width: 'auto',
        height: 50,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        alignitems: 'center',
        justifycontent: 'center',
        justifyContent: 'space-around'
    }, play: {
        width: 30,
        height: 30
    }, bodytext: {
        width: 320,
        height: 'auto',
        flexDirection: 'column',

    }, namebook: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        marginTop: 7,

    },
    content: {
        fontSize: 12,
        marginTop: 2,
        fontFamily: 'Poppins-Medium',
        marginBottom: 15
    },

})