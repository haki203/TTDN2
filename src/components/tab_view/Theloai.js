import { Image, StyleSheet, Text, View, TextInput, Dimensions, FlatList, useWindowDimensions, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { _isDomSupported } from '../../../server/public/assets/vendor/chart.js/helpers'
import AxiosIntance from '../../axios/AxiosIntance'
import Viewdetail from './Viewdetail';
const { width, height } = Dimensions.get('window');

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#F2F2F2";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";

const Theloai = (props) => {
  const { navigation, toggleModal } = props;
  const [dataNe, setdataNe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getAllCate = async () => {
    let arrayData = [];
    const respone = await AxiosIntance().get("/product/category/getAlls");
    for (let i = 0; i < respone.category.length; i++) {
      if (respone.category[i]) {
        let dataIndex = respone.category[i]
        arrayData.push(dataIndex);
      }
    }
    setdataNe(arrayData);


    setIsLoading(false)

  }



  useEffect(() => {
    getAllCate();

  }, [])

  const ItemBook = ({ item, navigation }) => {
    const { _id, name } = item;

    const onPressItem = () => {
      navigation.navigate('Viewdetail', { id: _id, name: name });

      toggleModal();
    }

    return (
      <TouchableOpacity onPress={() => onPressItem()} >
        {/* Image */}
        <Text style={styles.text}>{name}</Text>

      </TouchableOpacity>
    );
  }


  return (
    <View style={styles.container}>
      {
        isLoading ?
          (
            <View style={{ width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }}><ActivityIndicator size={30} color={'black'} /></View>
          ) :
          (
            <FlatList
              style={{ flexGrow: 0, paddingBottom: 20 }}
              data={dataNe}
              renderItem={({ item }) => <ItemBook item={item} navigation={navigation} />}
              keyExtractor={item => item._id}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />


          )
      }
    </View>
  )
}

export default Theloai

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, text: {
    fontSize: 17,
    padding: 20,
    width: 150,
    height: 70,
    fontWeight: '700',
    color: 'black',
    margin: 5
  }

})

