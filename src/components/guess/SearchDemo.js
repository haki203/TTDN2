import { StyleSheet, Text, View, Dimensions, Image, FlatList, ScrollView, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import ItemSearch2 from '../ItemFlatList/ItemSearch2';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../navigation/AppContext';
import AxiosIntance from '../../axios/AxiosIntance';
import Icon from 'react-native-vector-icons/AntDesign';
const { height } = Dimensions.get('window');
const backroundContainer = '#FFFFFF';
const bacroundHeight = '#E8E8E8';
const backroundSearch = '#E8E8E8';
const bacroundColor = '#272956';
const ColorAuthor = '#4838D1';
const SearchDemo = (props) => {
  const { navigation } = props;
  // const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const [dataNe, setdataNe] = useState([]);
  const [data1Ne, setdata1Ne] = useState([]);
  const [imagee, setImagee] = useState([]);
  const [nameauthor, setNameauthor] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [dataRecent, setDataRecent] = useState([]);
  const [searchText, setSearchText] = useState('');
  let timeout = null;
  let searchPerformed = false;
  // const countDownSearch = (text) => {
  //   if (timeout) {
  //     clearTimeout(timeout);
  //   }
  //   if (!searchPerformed) {
  //     timeout = setTimeout(() => {
  //       search(text);
  //       searchPerformed = true;
  //     }, 3000);
  //   }
    
  // }
  const search = async (text) => {
    setdataNe([]);
    setisLoading(true);
    //setisLoading(true);
    if (text.length > 0) {
      const respone = await AxiosIntance().get("/product/search/name?keyword=" + text);
      if (respone.result == true) {
        // lay du lieu
        setdataNe(respone.product);
        setdata1Ne(respone.product);
        console.log("data neee " + respone.product)
        setisLoading(false);
      }
      else {
        ToastAndroid.show("Lay du lieu that bai", ToastAndroid.SHORT);
      }
    }
  }
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchText.length > 0) {
        search(searchText);
      }
    }, 2000); // Đợi 1 giây trước khi gọi hàm search

    return () => clearTimeout(delaySearch); // Xóa timeout nếu component bị unmounted
  }, [searchText]);
  const HandleChangeText = async (text) => {
    setisLoading(true);

    setSearchText(text)
    if(!text){
      getNews()
    }
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
            <Image source={require('../../assets/images/manerge.png')}></Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              style={styles.texxt}
              ref={textInputRef}
              value={searchText}
              onChangeText={(text) => { HandleChangeText(text) }}
              placeholderTextColor="black"
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
                data={dataNe}
                renderItem={({ item }) => <ItemSearch2 author={item} product={item} navigation={navigation} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
              />
            )}
        </View>
      </View>
    </View>
  )
}
export default SearchDemo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backroundContainer
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: '25%'
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
    paddingLeft: 50,
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    justifyContent: 'center',
  },
  search: {
    position: 'absolute',
    top: '35%',
    left: 22
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
    left: '100%',
    top: '4%',
  },
  huy: {
    color: bacroundColor,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    lineHeight: 22
  },
  huy1: {
    left: '18%'
  }, 
  texxt:{
    fontSize: 14,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    width:'80%',
    color: '#000'
  }
})

