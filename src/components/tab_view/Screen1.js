import { Image, StyleSheet, Text, View, TextInput, Dimensions, FlatList, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
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

  const [datasearch, setDatasearch] = useState([]);
  const [datapublicAt, setDatapublicAt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState('Đang cập nhật');
  const [textHot, setTextHot] = useState("Sách hot");
  const [textNew, setTextNew] = useState("Sách mới xuất bản");
  const [textNoti, setTextNoti] = useState("");

  useEffect(() => {
    const getAllCate = async () => {
      let arrayData = [];
      const respone = await AxiosIntance().get("/product/get-by-category/" + id);
      setTextNoti("")
      if (respone.product.length < 1) {
        console.log("chua co sach");
        setTextHot("");
        setTextNew("");
        setTextNoti("Danh mục đang được cập nhật")
        setIsLoading(false);
      } else if (respone.product.length < 3) {
        setTextHot("Tất cả sách");
        setTextNew("");
        setIsLoading(false);
        for (let i = 0; i < respone.product.length; i++) {
          if (respone.product[i]) {
            let dataIndex = respone.product[i];
            // lay author
            const res = await AxiosIntance().get("/product/author/" + respone.product[i].authorId)
            dataIndex.authorId = res.author.name;
            arrayData.push(dataIndex);
          }

        }

        const sortedpublicAt = arrayData.slice().sort((a, b) => b.publicAt - a.publicAt);
        const sortedsearch = arrayData.slice().sort((a, b) => b.search - a.search);
        setDatasearch(sortedsearch);
        setDatapublicAt(null);
        setIsLoading(false)
      } else {
        for (let i = 0; i < respone.product.length; i++) {
          if (respone.product[i]) {
            let dataIndex = respone.product[i];
            // lay author
            const res = await AxiosIntance().get("/product/author/" + respone.product[i].authorId)
            dataIndex.authorId = res.author.name;
            arrayData.push(dataIndex);
          }

        }

        const sortedpublicAt = arrayData.slice().sort((a, b) => b.publicAt - a.publicAt);
        const sortedsearch = arrayData.slice().sort((a, b) => b.search - a.search);
        setDatasearch(sortedsearch);
        setDatapublicAt(sortedpublicAt);
        setIsLoading(false)
      }

    }

    getAllCate();


  }, [])


  const ItemBook = ({ item, navigation, isLoading }) => {
    const { _id, title, authorId, image } = item;
    const onPressItem = () => {
      navigation.navigate('Detail', { itemId: _id });
    }

    return (
      <TouchableOpacity onPress={() => onPressItem()} style={{}}>
        {
          !isLoading ? (
            <Image
              source={{ uri: image }}
              style={[styles.renderImagePopularDeals,]}
              shadowColor="black"
              shadowOffset={[5, 5]}
              shadowOpacity={1}
              shadowRadius={5}
            />
          ) : (
            <View style={[styles.renderImagePopularDeals, { justifyContent: 'center', backgroundColor: '#d6d6d6' }]}><ActivityIndicator size={25} color={'gray'} /></View>
          )
        }


        {/* Text */}
        <View style={styles.containerText}>
          <Text numberOfLines={1} style={styles.rendername}>{title}</Text>

          <Text style={styles.renderauthor}>{authorId}</Text>
        </View>
        {/* IconAdd */}
      </TouchableOpacity>
    );
  }
  const ItemBook1 = ({ }) => {
    return (
      <View style={{ paddingRight: 7, paddingLeft: 7,width:width/2 }}>
        <View style={[styles.renderImagePopularDeals, { justifyContent: 'center', backgroundColor: '#d6d6d6',width:'80%' }]}><ActivityIndicator size={25} color={'gray'} /></View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {
        isLoading ?
          (
            <View>
              <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>{textHot}</Text>
              <FlatList

                data={["name", "aav"]}
                renderItem={({ item }) => <ItemBook1 />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
              <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>{textNew}</Text>
              <FlatList

                data={["name", "aav"]}
                renderItem={({ item }) => <ItemBook1 />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) :

          (
            <View>
              <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>{textHot}</Text>
              <FlatList
                style={{ flexGrow: 0 }}
                data={datasearch}
                renderItem={({ item }) => <ItemBook item={item} navigation={navigation} isLoading={isLoading} />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>{textNew}</Text>
              <FlatList
                style={{ flexGrow: 0 }}
                data={datapublicAt}
                renderItem={({ item }) => <ItemBook item={item} navigation={navigation} isLoading={isLoading} />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

          )
      }



      <Text style={{ fontSize: 20, fontWeight: '500', color: color_txt2, marginLeft: 10 }}>{textNoti}</Text>

    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerText: {
    marginLeft: 5,
    marginTop: -10
  }, rendername: {
    color: namebook_color,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
    width: 140

  }, renderImagePopularDeals: {
    width: 150,
    height: 220,
    margin: 20,
    borderRadius: 10,
    marginLeft: 1
  },
  renderauthor: {
    color: 'black'
  }
})

