import {
  StyleSheet, Text,
  View, Image, ScrollView,
  FlatList, Animated, TouchableOpacity
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../navigation/AppContext';
import AxiosIntance from '../axios/AxiosIntance';

import ItemListView2 from './ItemListView2';
const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";
const color_logo = '#272956';
const HotScreen = (props) => {
  const { navigation } = props;
  const { infoUser } = useContext(AppContext);
  const [dataNe, setdataNe] = useState([]);


  useEffect(() => {
    const getAllCate = async () => {
      const respone = await AxiosIntance().get("/product");
      if (respone.result == true) {
        for (let i = 0; i < respone.product.length; i++) {
          const data1 = {
            search: respone.product[i].search
          }
          const sortedData = respone.product.slice().sort((a, b) => b.search - a.search);

          setdataNe(sortedData)

        }

      } else {
        ToastAndroid.show("get data", ToastAndroid.SHORT);
      }
    }
    getAllCate();

  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.Headers]}>
        <View style={styles.header}>
          <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
            <Text style={styles.authen}>Hots</Text>
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
            <TouchableOpacity>
              <Image style={styles.tok} source={require('../assets/images/search.png')} />
            </TouchableOpacity>
            <Image style={styles.profile} source={{ uri: infoUser.avatar }} />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={dataNe}
          renderItem={({ item }) => <ItemListView2 dulieu={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default HotScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  Headers: {
    flexDirection: 'row',
    height: 80,
  },
  hot: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    marginTop: 20,
    marginLeft: 20
  }, icon: {
    marginLeft: 10,
    width: "60%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }, search: {
    width: 40,
    height: 40,
    marginTop: 16,
    marginRight: 10
  }, profile: {
    width: 40,
    height: 40,
    borderRadius: 30
  }, body: {
    flexDirection: 'column',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingTop: 10,

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
