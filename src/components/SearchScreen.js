import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ItemSearch from './ItemSearch';
import { AppContext } from '../navigation/AppContext';
const { height } = Dimensions.get('window');
const backroundContainer = '#FFFFFF';
const bacroundHeight = '#C4C4C426';
const backroundSearch = '#C4C4C426';
const bacroundColor = '#272956';
const ColorAuthor = '#4838D1';
const SearchScreen = (props) => {
  const { navigation } = props;
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setIsTabVisible(false)
  //   });

  //   return unsubscribe;
  // }, []);
  const [data, setData] = useState([
    {
      "name": "Herzog - Hane",
      "category": "Turlock",
      "image": "https://www.dtv-ebook.com/images/files_2/2020/vuong-gia,-di-thong-tha-dich-lam-an.jpg",
      "_id": "1"
    },
    {
      "name": "Botsford, Schimmel and Kovacek",
      "category": "Grapevine",
      "image": "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
      "_id": "2"
    },
    {
      "name": "Collins - Gutkowski",
      "category": "Rochester Hills",
      "image": "https://pos.nvncdn.net/fd5775-40602/ps/20200224_rlGHQmvUk1Lv5YZdipd7evrW.png",
      "_id": "3"
    },
    {
      "name": "Corwin, Romaguera and Schinner",
      "category": "Collierville",
      "image": "https://is4-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/5f/1d/64/5f1d646b-fced-d892-9474-dc8cdf150630/08e8e709-17c9-4186-9881-d34815fca8d2_5.png/643x0w.jpg",
      "_id": "4"
    },
    {
      "name": "Reinger, Smitham and Osinski",
      "category": "Spring Hill",
      "image": "https://www.dtv-ebook.com/images/files_2/2019/am-anh-tu-kiep-truoc-dr.-brian-l.-weiss.jpg",
      "_id": "5"
    },
    {
      "name": "Dooley Group",
      "category": "Encinitas",
      "image": "https://isach.info/images/story/cover/am_anh_tu_kiep_truoc_bi_mat_cua_su_song_va_cai_chet__brian_l_weiss.jpg",
      "_id": "6"
    },
    {
      "name": "Wiegand Group",
      "category": "Conway",
      "image": "https://atlan.edu.vn/wp-content/uploads/2022/11/Sach-Kiep-Nao-Ta-Cung-Tim-Thay-Nhau.jpg",
      "_id": "7"
    },
    {
      "name": "Renner - Kuphal",
      "category": "Spring Hill",
      "image": "https://www.dtv-ebook.com/images/truyen-online/ebook-xac-am-prc-pdf-epub.jpg",
      "_id": "8"
    },
    {
      "name": "Hansen LLC",
      "category": "Town 'n' Country",
      "image": "https://www.dtv-ebook.com/images/Cover/34756774223_86debeda04_b.jpg",
      "_id": "9"
    },
    {
      "name": "Feil - Zboncak",
      "category": "Decatur",
      "image": "https://www.dtv-ebook.com/images/Cover/36363352494_ae04b1563f_o.jpg",
      "_id": "10"
    },
    {
      "name": "Paucek, Connelly and Blanda",
      "category": "Richmond",
      "image": "https://www.dtv-ebook.com/images/truyen-online/ebook-em-khong-biet-prc-pdf-epub.jpg",
      "_id": "11"
    },
    {
      "name": "Bruen - Goodwin",
      "category": "Ames",
      "image": "https://www.dtv-ebook.com/images/truyen-online/ebook-Thuong-nhau-de-do-full-prc-pdf-epub.jpg",
      "_id": "12"
    },
    {
      "name": "Dooley Inc",
      "category": "Castro Valley",
      "image": "https://www.dtv-ebook.com/images/files_2/2019/chuyen-chu-nghia-tieng-anh-nguyen-van-phu.jpg",
      "_id": "13"
    },
    {
      "name": "Morissette Group",
      "category": "Broken Arrow",
      "image": "https://www.dtv-ebook.com/images/cover_1/lac-rung-trung-trung-dinh.jpg",
      "_id": "14"
    },
    {
      "name": "Schuppe and Sons",
      "category": "South Hill",
      "image": "https://www.dtv-ebook.com/images/files_2/2021/112021/hoi-sinh-tu-kiep-quy.jpg",
      "_id": "15"
    },
    {
      "name": "Grimes, Cummings and Harris",
      "category": "Centennial",
      "image": "https://www.dtv-ebook.com/images/Cover/33704613011_12730a2d82.jpg",
      "_id": "16"
    },
    {
      "name": "Mante - Hills",
      "category": "Coconut Creek",
      "image": "https://www.dtv-ebook.com/images/files_2/2023/012023/ngoi-nha-mat-troi.jpg",
      "_id": "17"
    },
    {
      "name": "Cassin - Hintz",
      "category": "Pflugerville",
      "image": "https://www.dtv-ebook.com/images/files_2/2019/nuoc-mat-dang-duong-thien-ly.jpg",
      "_id": "18"
    },
    {
      "name": "Swift - Kessler",
      "category": "St. Peters",
      "image": "https://www.dtv-ebook.com/images/files_2/2020/gia-tu-mua-dong-nguyen-thi-ngoc-tu.jpg",
      "_id": "19"
    },
    {
      "name": "McDermott, Tremblay and Skiles",
      "category": "Bothell",
      "image": "https://www.dtv-ebook.com/images/files_2/2020/tim-trong-noi-nho-le-ngoc-mai.jpg",
      "_id": "20"
    },
  ])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const textInputRef = React.createRef(); // Tạo một ref cho TextInput
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = data.filter(item => item.name.includes(searchQuery));
    setFilteredData(filtered)
  }
  // const filtered = data.filter(item => item.name.includes(searchQuery));
  const latestText = filteredData.length > 10 ? 'Latest' : 'Results';
  const resetSearch = () => {
    navigation.goBack();
  }
  return (
    <View>
      <View style={styles.hearderContainer}>
        <Image style={styles.search} source={require('../assets/images/manerge.png')}></Image>
        <View style={{ flexDirection: 'row' }}>
          <TextInput ref={textInputRef} onChangeText={(text) => handleSearch(text)} placeholder='Search' style={styles.TextSearch}>
          </TextInput>
          <TouchableOpacity onPress={resetSearch}>
            {/* <Image style={styles.mark} source={require('../assets/images/mark.png')}></Image> */}
            <Text style={styles.huy}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>

        <Text style={styles.content}>{latestText}</Text>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ItemSearch product={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          disableVirtualization={true} // Thêm thuộc tính này
        />
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
  hearderContainer: {
    height: height * 0.1,
  },
  listContainer: {
    height: height * 0.88,
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
    width: 305,
    height: 49,
    backgroundColor: backroundSearch,
    borderRadius: 15,
    marginLeft: 29,
    marginTop: 18,
    paddingLeft: 55,
    // paddingRight: 50
  },
  search: {
    position: 'absolute',
    marginTop: 36,
    marginLeft: 50
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
    marginHorizontal: 25,
    marginTop: 8
  },
  huy: {
    color: bacroundColor,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 22,
    marginTop: 30,
    fontFamily: 'Poppins',
    marginLeft: 18
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