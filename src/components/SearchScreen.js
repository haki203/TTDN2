import { StyleSheet, Text, View, Dimensions, Image, FlatList, ScrollView, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import ItemSearch from './ItemSearch';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../navigation/AppContext';
import AxiosIntance from '../axios/AxiosIntance';
import Icon from 'react-native-vector-icons/AntDesign';
const { height } = Dimensions.get('window');
const backroundContainer = '#FFFFFF';
const bacroundHeight = '#E8E8E8';
const backroundSearch = '#E8E8E8';
const bacroundColor = '#272956';
const ColorAuthor = '#4838D1';
const SearchScreen = (props) => {
  const { navigation } = props;
  // const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const [dataNe, setdataNe] = useState([]);
  const [imagee, setImagee] = useState([]);
  const [nameauthor, setNameauthor] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [dataRecent, setDataRecent] = useState([]);
  const [searchText, setSearchText] = useState('');
  let timeout = null;
  const countDownSearch = (text) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      search(text);
    }, 2000);
  }
  const search = async (text) => {
    setisLoading(true);
    if (text.length > 0) {
      const respone = await AxiosIntance().get("/product/search/name?keyword=" + text);
      if (respone.result == true) {
        // lay du lieu
        setdataNe(respone.product);
        console.log("data neee " + respone.product)
        setisLoading(false);
      }
      else {
        ToastAndroid.show("Lay du lieu that bai", ToastAndroid.SHORT);
      }
    }
  }

  const HandleChangeText = async (text) => {
    setSearchText(text)
    if (text.length > 1) {

      countDownSearch(text)
    }
    console.log(text);
    getNews()
    console.log(dataNe.length);
  }

  const getNews = async () => {
    setisLoading(true);
    const respone = await AxiosIntance().get("/product/search/recent");
    if (respone.result == true) {
      setdataNe(respone.top5Products)
      setisLoading(false);
    } else {
      ToastAndroid.show("get product recent", ToastAndroid.SHORT);
    }
  }
  useEffect(() => {
    getNews();
    return () => {
    }
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      getNews();
      setSearchText('')
      return () => {
        // Cleanup code (optional) when the screen loses focus
      };
    }, [])
  );

  const textInputRef = React.createRef(); // Tạo một ref cho TextInput

  // const filtered = data.filter(item => item.name.includes(searchQuery));
  const latestText = searchText.length > 0 ? 'Kết quả tìm kiếm' : 'Tìm kiếm gần đây';
  // const latestText2 = dataNe.length > 0 ? 'Results' : 'Lastest';
  const resetSearch = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.hearderContainer}>
        <View style={styles.TextSearch}>
          <TouchableOpacity style={styles.search} onPress={search}>
            <Image source={require('../assets/images/manerge.png')}></Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              ref={textInputRef}
              value={searchText}
              onChangeText={(text) => { HandleChangeText(text) }}
              placeholderTextColor="#A9A9A9"
              placeholder='Tìm kiếm sách...'
            >
            </TextInput>
            <TouchableOpacity onPress={() => HandleChangeText("")}>
              {searchText.length > 0 && <Icon name="close" size={25} color="#000" right="15%" /> /* Hiển thị Icon khi searchText có độ dài lớn hơn 1 */}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.huy1} onPress={resetSearch}>
          <Text style={styles.huy}>Hủy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.content}>{latestText}</Text>
          {/* <Text style={styles.content1}></Text> */}
        </View>
        <View style={styles.container1}>
          {
            isLoading == true ? (
              <View >
                <ActivityIndicator size='large' color='#fff00' />
                <Text style={{ color: 'black', fontSize: 14, fontWeight: '600', textAlign: 'center' }}>Loading...</Text>
              </View>
            ) : (
              <FlatList
                style={{ paddingBottom: 100 }}
                data={dataNe}
                renderItem={({ item }) => <ItemSearch author={item} product={item} navigation={navigation} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
              />
            )}
        </View>
      </View>
    </View>
  )
}
export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backroundContainer
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  hearderContainer: {
    height: height * 0.1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    height: height * 0.9,
    backgroundColor: bacroundHeight,
    borderTopRightRadius: 43,
    borderTopLeftRadius: 43,
  },
  DrawBar: {
    marginHorizontal: 29,
    marginTop: 39
  },
  profile: {
    marginHorizontal: 20,
    marginTop: 27,
    marginRight: 32
  },
  Darkmo: {
    marginTop: 34.5,
  },
  TextSearch: {
    width: '75%',
    height: '65%',
    backgroundColor: backroundSearch,
    borderRadius: 15,
    // marginLeft: 29,
    // marginTop: 18,
    paddingLeft: 50,
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    justifyContent: 'center',
    // paddingRight: 50
  },
  search: {
    position: 'absolute',
    top: '37%',
    left: 22
    // // left: '17%',
    // // top: '45%'
    // left: '30%'
  },
  mark: {
    position: 'absolute',
    marginTop: -3,
    marginLeft: 335
  },
  content: {
    color: bacroundColor,
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.408,
    lineHeight: 22,
    left: '80%',
    top: '3%',
  },
  huy: {
    color: bacroundColor,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    lineHeight: 22
    // marginTop: 30,
    // marginLeft: 15,
  },
  huy1: {
    // right: 0,
    // position: 'absolute',
    // marginRight: 12,
    // top: '40%'
    left: '18%'
  }
})

const data1 = [
  {
    "name": "Herzog - Hane",
    "category": "Turlock",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "1"
  },
  {
    "name": "Botsford, Schimmel and Kovacek",
    "category": "Grapevine",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "2"
  },
  {
    "name": "Collins - Gutkowski",
    "category": "Rochester Hills",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "3"
  },
  {
    "name": "Corwin, Romaguera and Schinner",
    "category": "Collierville",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "4"
  },
  {
    "name": "Reinger, Smitham and Osinski",
    "category": "Spring Hill",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "5"
  },
  {
    "name": "Dooley Group",
    "category": "Encinitas",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "6"
  },
  {
    "name": "Wiegand Group",
    "category": "Conway",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "7"
  },
  {
    "name": "Renner - Kuphal",
    "category": "Spring Hill",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "8"
  },
  {
    "name": "Hansen LLC",
    "category": "Town 'n' Country",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "9"
  },
  {
    "name": "Feil - Zboncak",
    "category": "Decatur",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "10"
  },
  {
    "name": "Paucek, Connelly and Blanda",
    "category": "Richmond",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "11"
  },
  {
    "name": "Bruen - Goodwin",
    "category": "Ames",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "12"
  },
  {
    "name": "Dooley Inc",
    "category": "Castro Valley",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "13"
  },
  {
    "name": "Morissette Group",
    "category": "Broken Arrow",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "14"
  },
  {
    "name": "Schuppe and Sons",
    "category": "South Hill",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "15"
  },
  {
    "name": "Grimes, Cummings and Harris",
    "category": "Centennial",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "16"
  },
  {
    "name": "Mante - Hills",
    "category": "Coconut Creek",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "17"
  },
  {
    "name": "Cassin - Hintz",
    "category": "Pflugerville",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "18"
  },
  {
    "name": "Swift - Kessler",
    "category": "St. Peters",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "19"
  },
  {
    "name": "McDermott, Tremblay and Skiles",
    "category": "Bothell",
    "image": "https://loremflickr.com/640/480/animals",
    "_id": "20"
  },
]