import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import AxiosIntance from '../../axios/AxiosIntance';
const bacroundColor = '#272956';
const ColorAuthor = '#4838D1';
const ItemSearch = (props) => {
  const { product, navigation } = props;
  const [name, setName] = useState("Chưa có");
  const [id, setId] = useState(product._id);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        if (product.authorId) {

          const respone = await AxiosIntance().get(`/product/author/${product.authorId}`);

          setName(respone.author.name)
        }
      } catch (error) {
      }

    }
    try {
      getAdmin();
    } catch (error) {
      setName("Chưa có");
    }

  }, []);
  const onClickDetail = async () => {
    navigation.navigate('Detail', { itemId: id });
    const reponse = await AxiosIntance().get(`/product/search/select/${id}`);
    console.log("response day: ", reponse)
    if (reponse.result == true) {

    }

  }
  const btnclick = () => {
    ToastAndroid.show("Sách đang cập nhật", ToastAndroid.SHORT);

  }
  return (

    <>
      {product.disable ? (<TouchableOpacity onPress={() => btnclick()} style={{ opacity: 0.5 }}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Image style={styles.image1} source={{ uri: product.image }}></Image>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.nameBook}>{product.title}</Text>
            <Text style={styles.category}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>) : (<TouchableOpacity onPress={() => onClickDetail()}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Image style={styles.image1} source={{ uri: product.image }}></Image>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.nameBook}>{product.title}</Text>
            <Text style={styles.category}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>)}
    </>

  )
}

export default ItemSearch

const styles = StyleSheet.create({
  image1: {
    width: '17%',
    height: 106,
    display: 'flex',
    flexShrink: 0,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  nameBook: {
    color: bacroundColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18
  },
  category: {
    color: ColorAuthor,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
  },
})