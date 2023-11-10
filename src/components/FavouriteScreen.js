import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import AxiosIntance from '../axios/AxiosIntance'

import ItemListView from './ItemListView';
import Icon from "react-native-vector-icons/AntDesign"
import { AppContext } from '../navigation/AppContext';
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



  const { navigation } = props;
  const search = () => (
    navigation.navigate('SearchScreen')

  );
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });
    const fetchData = async () => {
      try {
        const getId = {
          id: infoUser.id
        }
        let arrayData = [];
        console.log("id ne: ", infoUser.id);
        const response = await AxiosIntance().get("product/favourite/get-book-by-user/" + infoUser.id);
        console.log("res ne: ", response);
        if (response.result == true) {
          console.log("dataindex");
          for (let i = 0; i < response.books.length; i++) {
            if (response.books[i]) {
              let dataIndex = response.books[i];
              // lay author
              const res = await AxiosIntance().get("/product/author/" + response.books[i].authorId)
              dataIndex.authorId = res.author.name;
              arrayData.push(dataIndex);
            }
          }


          setData(arrayData);
          setIsLoading(false)

        }
        // Gọi getdata sau khi setData
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();


    return unsubscribe;
  },
    []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
          <Text style={styles.authen}>Favourites</Text>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity>
          <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
        </View>
      </View>
      <Text style={styles.title1}>
        Favourites Book
      </Text>

      <View style={styles.flatlist}>

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
          data={data}
          renderItem={({ item }) => <ItemListView dulieu={item} navigation={navigation} />}
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
    backgroundColor: bgcolor,
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
    marginBottom: 5
  }, flatlist: {
    width: '100%',
    height: '100%'
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
    height: 40
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

const DATAne = [
  {
    "id": 1,
    "book_name": "Manusia Setengah Dewa",
    "author_name": "Bonifas",
    "image": require('../assets/images/Rectangle1.png'),
  }, {
    "id": 2,
    "book_name": "Tanpa Karena",
    "author_name": "Takos",
    "image": require('../assets/images/Rectangle2.png'),
  }, {
    "id": 3,
    "book_name": "Persahabatan Bagai Kepompong",
    "author_name": "Rosberg",
    "image": require('../assets/images/Rectangle3.png'),
  }, {
    "id": 4,
    "book_name": "Sahabat Sejati",
    "author_name": "Coviello",
    "image": require('../assets/images/Rectangle4.png'),
  }, {
    "id": 5,
    "book_name": "Sahabat Sejati",
    "author_name": "Chugg",
    "image": require('../assets/images/Rectangle5.png'),
  }, {
    "id": 6,
    "book_name": "Ana",
    "author_name": "Gerger",
    "image": require('../assets/images/Rectangle1.png'),
  }, {
    "id": 7,
    "book_name": "Stevana",
    "author_name": "Riddle",
    "image": require('../assets/images/Rectangle1.png'),
  }, {
    "id": 8,
    "book_name": "Rad",
    "author_name": "Parfrey",
    "image": require('../assets/images/Rectangle1.png'),
  }, {
    "id": 9,
    "book_name": "Billye",
    "author_name": "Itzhaki",
    "image": require('../assets/images/Rectangle1.png'),
  }, {
    "id": 10,
    "book_name": "Roselle",
    "author_name": "Joberne",
    "image": require('../assets/images/Rectangle1.png'),
  }
]