import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import ItemListView from './ItemListView';
import Icon from "react-native-vector-icons/AntDesign"
const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";

const FavouriteScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Favorites
        </Text>
        <Text style={styles.title1}>
          Book
        </Text>
        <View style={{ marginTop: 7, width: 48, height: 2, backgroundColor: 'green' }}>
        </View>
      </View>
      <View style={styles.flatlist}>

        <FlatList
          data={DATAne}
          renderItem={({ item }) => <ItemListView dulieu={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />

      </View>
      <View style={styles.plus}>
        <Icon style={{ color: pluscolor, marginTop: 4 }} name='pluscircleo' size={30} />
        <Text style={{ fontSize: 26, color: pluscolor, fontFamily: 'Poppins', fontWeight: '700' }}>Explore discover</Text>
      </View>
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
  }, header: {
    width: '100%',
    height: 140,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 24
  }, title: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 27,
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: 20
  }, title1: {
    marginTop: 20,
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700'
  }, flatlist: {
    width: '100%',
    height: 420,
    paddingLeft: 14
  }, plus: {
    width: 290,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
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