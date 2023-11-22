import { Button, StyleSheet, Text, View, Switch, Image, Dimensions, TouchableOpacity } from 'react-native';
import { AppContext } from '../navigation/AppContext'

import React, { useContext, useEffect, useState } from 'react'

const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";
const color_logo = '#272956';
const { width, height } = Dimensions.get('window');
const progress = '80%'
const LibraryScreen = (props) => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const { navigation } = props;
  const search = () => (
    navigation.navigate('SearchScreen')

  );
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
          <Text style={styles.authen}>Librarys</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity>
          <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
        </View>
      </View>
      <View View style={styles.bodyContainer}>
        <View style={styles.textAllNumber}>
          <Text style={styles.textAll} >All (1)</Text>
        </View>


        <View style={styles.book}>
          <Image style={styles.imagebook} source={require('../../src/assets/images/Dac-Nhan-Tam.jpg')} />
          <View style={styles.in4book}>
            <Text style={styles.nameBook}> Tên Sách</Text>
            <Text style={styles.nameAuthor}> Tên tác giả</Text>
            <View style={styles.doneprocess}>
              <Text style={{ marginStart: 7, marginTop: 15, color: '#272956', fontWeight: "500" }}>Đã đọc</Text>
              <View style={styles.process}>
                <Text style={{ color: '#272956', fontWeight: "500" }}>{progress}</Text>
              </View>
            </View>
            <View style={styles.processbar}>
              <View style={{ // Thanh màu xám
                height: 10,
                width: progress,
                position: 'absolute',
                left: 0,
                backgroundColor: 'red',
                borderRadius: 5
              }} />
              <View style={{
                height: 10,
                width: '20%',
                right: 0,
                position: 'absolute',

              }} />
            </View>
          </View>
          <Image style={styles.image3cham} source={require('../../src/assets/images/ic3cham.png')} />
        </View>

      </View>
    </View>
  );
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
  },

  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  bodyContainer: {
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    flex: 1,
    padding: 10,
    paddingStart: 15

  },
  body: {


  },

  imagebook: {
    height: 140,
    width: 90,
    borderRadius: 20
  },
  textAll: {
    fontSize: 23,

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
    marginTop: 7,
    borderRadius: 5,

    height: 10,
    width: width * 0.4,
    backgroundColor: '#d6d6d6'
  },
  processbar2: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
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


});

export default LibraryScreen;