import { Button, StyleSheet, Text, View, Switch, Image, Dimensions, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { AppContext } from '../navigation/AppContext'
import ItemListViewLibrary from './ItemFlatList/ItemListViewLibrary';
import React, { useContext, useEffect, useState } from 'react'
import AxiosIntance from '../axios/AxiosIntance';
import { useFocusEffect } from '@react-navigation/native';

const progress = '80%'
const color_logo = '#272956';
const LibraryScreen = (props) => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const { infoUser } = useContext(AppContext);
  const { navigation } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const [sum, setSum] = useState(0);
  const [data, setData] = useState([]);
  const [arrayLB, setArrayLB] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayBook, setArrayBook] = useState([]);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const search = () => (
    navigation.navigate('SearchScreen')

  );
  const getLB = async () => {
    setIsLoading(false)
    try {
      const response = await AxiosIntance().get('/product/library/' + infoUser.id);
      console.log(infoUser.id);
      console.log(response);
      let arrayBook = [];
      for (let i = 0; i < response.library.length; i++) {
        const res = await AxiosIntance().get('/product/' + response.library[i].bookId);
        console.log(res);

        const ress = await AxiosIntance().get('/product/author/' + res.product.authorId);
        console.log(" author ne: ", res.product.authorId);
        console.log("ress author ne: ", ress);
        const lb = {
          image: res.product.image,
          id: res.product._id,
          nameAuthor: ress.author.name,
          title: res.product.title,
          userId: response.library[i].userId,
          progress: response.library[i].progress,
          bookId: response.library[i].bookId
        }
        arrayBook.push(lb)
      }
      setSum(arrayBook.length)
      setData(arrayBook)
      console.log("data lb ne: ", data);
      setIsLoading(true)


    } catch (error) {
      console.log("error: ", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log("reloadr ne: ");
      getLB();

      return () => {
        // Cleanup code (optional) when the screen loses focus
      };
    }, [])
  );
  useEffect(() => {

    

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1, backgroundColor: '#f3f3f3', height: 80 }}>
          <Text style={styles.authen}>Thư Viện</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21, backgroundColor: '#f3f3f3', height: 80 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity>
          <Image style={{ width: 40, height: 40, borderRadius: 30 }} source={{ uri: infoUser.avatar }} />
        </View>
      </View>
      <View View style={styles.bodyContainer}>
        <View style={styles.textAllNumber}>
          <Text onPress={() => getLB()} style={styles.textAll} >Tất cả ({sum})</Text>

        </View>
        {isLoading?(
          <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ItemListViewLibrary dulieu={item} isLoading={isLoading} navigation={navigation} />}
        />
        ):(
          <View style={{width:'100%',height:'80%',justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={30} color={'grey'}/></View>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  trackColor: {
    false: '#000000',
    true: '#ffffff',
  },
  thumbColor: isEnabled => isEnabled ? '#000000' : '#ffffff',

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },



  textLibrary: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 20
  },
  switch: {
    marginEnd: 20
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },


  container: {
    flex: 1,
  },
  bodyContainer: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    height: '100%',
  },
  body: {

    marginStart: 15

  },

  imagebook: {
    height: 140,
    width: 90,
    borderRadius: 20
  },
  textAll: {
    fontSize: 22,
    marginStart: 5,

    color: '#000000',
    fontWeight: 'bold',
  },
  doneprocess: {
    flexDirection: 'row',
  },
  textAllNumber: {
    flexDirection: 'row',
  },
  textNumber: {
    marginTop: 3,
    fontSize: 18,

  },
  book: {
    marginTop: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#D9D9D9'
  },

  sort: {
    marginTop: 5,
    flexDirection: 'row',
  },
  textAllNumberSort: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 15
  },
  nameBook: {
    fontSize: 20,
    color: '#2E2E5D',
    fontWeight: '700'
  },
  nameAuthor: {
    fontSize: 17,
    color: '#4838D1',
    fontWeight: '500',

  },
  process: {

    fontWeight: "500",
    marginTop: 15,
    marginStart: 3

  },
  in4book: {
    marginStart: 20
  },
  image3cham: {
    position: 'absolute',
    right: 27,
    top: 45

  },
  processbar: {
    flexDirection: 'row',
    marginLeft: 7,
    marginTop: 7
  },
  processbar2: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: 'black',
  },
  tok: {
    width: 35,
    height: 35,
    marginRight: 10
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


});
const dataNe = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Tony buổi sáng',
    imageSource: require('../../src/assets/images/Dac-Nhan-Tam.jpg')
  },
  // Thêm các mục khác nếu cần
];
export default LibraryScreen;