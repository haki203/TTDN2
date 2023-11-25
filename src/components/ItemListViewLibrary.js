import { Button, StyleSheet, Text, View, Switch, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'


const { width, height } = Dimensions.get('window');
const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const pluscolor = "#CDCDCD";
const color_logo = '#272956';
const progress = '80%'
const ItemListViewLibrary = (props) => {
  const { dulieu } = props;

  try {
    return (
      <View style={styles.book}>
        <Image style={styles.imagebook} source={{uri:dulieu.image}} />
        <View style={styles.in4book}>
          <Text style={styles.nameBook}> {dulieu.title}</Text>
          {/* <Text style={styles.nameAuthor}> cc</Text> */}
          <View style={styles.doneprocess}>
            <Text style={{ marginStart: 7, marginTop: 15, color: '#272956', fontWeight: "500" }}>Đã đọc</Text>
            <View style={styles.process}>
              <Text style={{ color: '#272956', fontWeight: "500" }}>{dulieu.progress}%</Text>
            </View>
          </View>
          <View style={styles.processbar}>
            <View style={{ // Thanh màu xám
              height: 10,
              width: dulieu.progress,
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
    )
  } catch (error) {

  }
}

export default ItemListViewLibrary

const styles = StyleSheet.create({

  imagebook: {
    margin: 10,
    width: 60,
    height: 90,
    borderRadius: 10,
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
    marginTop: 17,
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
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
    color: color_text,
    marginTop: 5
  },
  nameAuthor: {
    fontSize: 14,
    color: '#4838D1',


  },
  process: {

    fontWeight: "500",
    marginTop: 14,
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
})
