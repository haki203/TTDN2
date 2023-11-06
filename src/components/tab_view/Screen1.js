import { Image, StyleSheet, Text, View, TextInput, Dimensions, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { _isDomSupported } from '../../../server/public/assets/vendor/chart.js/helpers'
import AxiosIntance from '../../axios/AxiosIntance'
const { width, height } = Dimensions.get('window');

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#F2F2F2";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";

const Screen1 = ({ navigation, id }) => {

  const [data, setData] = useState([]);
  const [author, setAuthor] = useState('Đang cập nhật');

  console.log(id);
  useEffect(() => {
    const getAllCate = async () => {
      let arrayData=[];
      const respone = await AxiosIntance().get("/product/get-by-category/" + id);
      for(let i=0;i<respone.product.length;i++){
        if(respone.product[i]){
          let dataIndex = respone.product[i];
          // lay author
          const res = await AxiosIntance().get("/product/author/"+respone.product[i].authorId)
          dataIndex.authorId=res.author.name;
          arrayData.push(dataIndex);
        }
      }
      setData(arrayData);
    }

    getAllCate();


  }, [])


  const ItemBook = ({ item, navigation }) => {
    const { _id, title, authorId, image } = item;
    const onPressItem=()=>{
      console.log("id cua book la: ",_id);
      navigation.navigate('Detail', { itemId: _id });
    }

    return (
      <TouchableOpacity onPress={()=>onPressItem() } style={{}}>
        {/* Image */}

        <Image
          source={{ uri: image }}
          style={[styles.renderImagePopularDeals,]}
          shadowColor="black"
          shadowOffset={[5, 5]}
          shadowOpacity={1}
          shadowRadius={5}
        />

        {/* Text */}
        <View style={styles.containerText}>
          <Text style={styles.rendername}>{title}</Text>
          <Text style={styles.renderauthor}>{authorId}</Text>
        </View>
        {/* IconAdd */}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2, marginLeft: 20 }}>Sách hot</Text>
      <FlatList
        style={{ flexGrow: 0, height: 340, }}
        data={data}
        renderItem={({ item }) => <ItemBook item={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2, marginLeft: 20 }}>Sách mới xuất bản</Text>
      <FlatList
        style={{ flexGrow: 0, height: 340, }}
        data={data}
        renderItem={({ item }) => <ItemBook item={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerText: {
    marginLeft: 16,
    marginTop: -10
  }, rendername: {
    color: namebook_color,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins'
  }, renderImagePopularDeals: {
    width: 150,
    height: 220,
    margin: 20,
    borderRadius: 10
  }
})

const dataImagePopularDeals = [
  { id: 0, book_name: 'Catcher in the Rye', author_name: 'J.D. Salinger', img: require('../tab_view/image/image103.png') },
  { id: 1, book_name: 'Mango', author_name: '1kg', img: require('../tab_view/image/image98.png'), },
  { id: 2, book_name: 'Banana', author_name: '1kg', img: require('../tab_view/image/image103.png') },
  { id: 3, book_name: 'Strawberry', author_name: '1kg', img: require('../tab_view/image/image98.png'), },
];