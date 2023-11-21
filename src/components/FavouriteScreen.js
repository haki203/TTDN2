import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import AxiosIntance from '../axios/AxiosIntance'
import { useFocusEffect } from '@react-navigation/native';
import ItemListView from './ItemListView';
import Icon from "react-native-vector-icons/AntDesign"
import { AppContext } from '../navigation/AppContext';
import { route } from '../../server/routes';
const { width, height } = Dimensions.get('window');

const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";
const color_logo = '#272956';
const FavouriteScreen = (props) => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const { infoUser } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textNoti, setTextNoti] = useState("");



  const settings = () => (
    navigation.navigate('Setting')

  );
  const { navigation } = props;
  const search = () => (
    navigation.navigate('SearchScreen')

  );
  const fetchData = async () => {
    setData([]);

    setTextNoti("")
    try {

      let arrayData = [];
      const response = await AxiosIntance().get("product/favourite/get-book-by-user/" + infoUser.id);
      if (response.result == true) {
        if (response.data.length < 1) {
          setIsLoading(false)
          setTextNoti('Chưa có sách nào trong mục yêu thích.')
        } else {

          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].book) {
              let dataIndex = response.data[i]
              // lay author
              const res = await AxiosIntance().get("/product/author/" + response.data[i].book.authorId)

              dataIndex.book.authorId = res.author.name;
              arrayData.push(dataIndex);
            }
          }
          setData(arrayData);
          setIsLoading(false)
        }

      }
      // Gọi getdata sau khi setData
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true)
      console.log("reloadr ne: ");
      fetchData();

      return () => {
        // Cleanup code (optional) when the screen loses focus
      };
    }, [])
  );
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });

    fetchData();


  },
    []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
          <Text style={styles.authen}>Yêu thích</Text>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity >
          <TouchableOpacity onPress={settings}>


            <Image style={styles.profile} source={{ uri: infoUser.avatar }} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.flatlist}>
        <Text style={styles.title1} onPress={() => fetchData()}>
          Các sách yêu thích
        </Text>
        <Text style={{ fontSize: 16, color: 'black', fontWeight: 500, position: 'absolute', start: 25, top: '15%' }}>{textNoti}</Text>
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
          data={data.slice().reverse()}
          renderItem={({ item }) => <ItemListView dulieu={item} navigation={navigation} reloadItem={fetchData} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />

      </View>

    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, title: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 27,
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: 20
  }, title1: {
    marginTop: 25,
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 25,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',

  }, flatlist: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30

  }, plus: {
    width: 290,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tok: {
    width: 40,
    height: 40,
    marginRight: 8
  }, profile: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  authen: {
    marginLeft: 8,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: color_logo,
    letterSpacing: 0.5

  }
})
