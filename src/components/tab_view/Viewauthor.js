import { Image, StyleSheet, Text, View, TextInput, Dimensions, FlatList, useWindowDimensions, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import { _isDomSupported } from '../../../server/public/assets/vendor/chart.js/helpers'
import AxiosIntance from '../../axios/AxiosIntance'
const { width, height } = Dimensions.get('window');
import Icon_1 from 'react-native-vector-icons/Ionicons';

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#F2F2F2";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";

const Viewauthor = ({ navigation, route }) => {

  const [datasearch, setDatasearch] = useState([]);
  const [datapublicAt, setDatapublicAt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textNoti, setTextNoti] = useState("");
  const { id, name } = route.params;

  const Back = () => {
    navigation.goBack();
  }


  useEffect(() => {
    const getAllCate = async () => {
      let arrayData = [];
      const respone = await AxiosIntance().get("/product/get-book-by-author/" + id);
      setTextNoti("")
      if (respone.products.length < 1) {

        setTextNoti("Danh mục đang được cập nhật")
        setIsLoading(false);
      } else {
        for (let i = 0; i < respone.products.length; i++) {
          if (respone.products[i]) {
            let dataIndex = respone.products[i];
            // lay author
            const res = await AxiosIntance().get("/product/author/" + respone.products[i].authorId)
            dataIndex.authorId = res.author.name;
            arrayData.push(dataIndex);
          }
        }
        setDatasearch(arrayData);
        setIsLoading(false)
      }
    }

    getAllCate();


  }, [id, name])


  const ItemBook = ({ item, navigation }) => {
    const { _id, title, authorId, image, disable, free } = item;
    const onPressItem = () => {
      navigation.navigate('Detail', { itemId: _id });
    }
    const btnDisable = () => {
      ToastAndroid.show("Sách đang cập nhật", ToastAndroid.SHORT);
    }
    return (
      <>
        {disable ? (<TouchableOpacity onPress={() => btnDisable()} style={{ opacity: 0.5 }}>
          {/* Image */}

          <Image
            source={{ uri: image }}
            style={[styles.renderImagePopularDeals,]}
            shadowColor="black"
            shadowOffset={[5, 5]}
            shadowOpacity={1}
            shadowRadius={5}
          />
          {!free ? (<View style={styles.bghoivien}>
            <Text style={styles.hoivien}>Hội viên</Text>
          </View>)
            : (

              <View style={[styles.bghoivien, { backgroundColor: 'green' }]}>
                <Text style={styles.hoivien}>Miễn phí</Text>
              </View>)
          }
          {/* Text */}
          <View style={styles.containerText}>
            <Text style={styles.rendername}>{title.substring(0, 20)}</Text>

            <Text style={styles.renderauthor}>{authorId}</Text>
          </View>
          {/* IconAdd */}
        </TouchableOpacity>) : (<TouchableOpacity onPress={() => onPressItem()} style={{}}>
          {/* Image */}

          <Image
            source={{ uri: image }}
            style={[styles.renderImagePopularDeals,]}
            shadowColor="black"
            shadowOffset={[5, 5]}
            shadowOpacity={1}
            shadowRadius={5}
          />
          {!free ? (<View style={styles.bghoivien}>
            <Text style={styles.hoivien}>Hội viên</Text>
          </View>)
            : (
              <View style={[styles.bghoivien, { backgroundColor: 'green' }]}>
                <Text style={styles.hoivien}>Miễn phí</Text>
              </View>)
          }
          {/* Text */}
          <View style={styles.containerText}>
            <Text style={styles.rendername}>{title.substring(0, 20)}</Text>

            <Text style={{ color: 'black' }}>{authorId}</Text>
          </View>
          {/* IconAdd */}
        </TouchableOpacity>)}
      </>

    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={Back}>
          <Icon_1 style={styles.iconback} name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </View>

      {
        isLoading ?
          (
            <View style={{ width: '100%', height: 300, alignContent: 'center', justifyContent: 'center' }}><ActivityIndicator size={30} color={'black'} /></View>
          ) :

          (
            <View></View>

          )
      }
      <FlatList
        style={{ flexGrow: 0, paddingBottom: 20 }}
        data={datasearch}
        renderItem={({ item }) => <ItemBook item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <Text style={{ fontSize: 20, fontWeight: '500', color: color_txt2, marginLeft: 20 }}>{textNoti}</Text>


    </View>
  )
}

export default Viewauthor

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
  }, header: {
    flexDirection: 'row',
    width: '100%',
    height: '13%',
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between', // Canh lề giữa iconback và name
    paddingHorizontal: 20,
  },
  iconback: {

  },
  name: {
    width: '70%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginRight: '15%',
  }, hoivien: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    padding: 4
  }, bghoivien: {
    backgroundColor: '#F79572',
    width: 56,
    height: "auto",
    borderRadius: 7,
    marginTop: -30,
    marginLeft: 65,
    marginBottom: 10
  }
})

