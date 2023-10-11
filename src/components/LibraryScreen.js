import { Button, StyleSheet, Text, View, Switch, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';

const LibraryScreen = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image style={styles.imagemenuic} source={require('../../src/assets/images/menuic.png')} />
          <Text style={styles.textLibrary}> LIBRARY</Text>
        </View>
        <View style={styles.rightHeader}>
          <Switch style={styles.switch} trackColor={styles.trackColor} thumbColor={styles.thumbColor(isEnabled)} onValueChange={setIsEnabled} value={isEnabled} />
          <Image style={styles.imageprofile} source={require('../../src/assets/images/user-setting.png')} />
        </View>
      </View>
      <View View style={styles.bodyContainer}>
        <View style={styles.body}>
          <View style={styles.textAllNumberSort}>
            <View style={styles.textAllNumber}>
              <Text style={styles.textAll} >All (1)</Text>
            </View>
            <View style={styles.sort}>
              <Image source={require('../../src/assets/images/icsort.png')} />
              <Text>Sort</Text>
            </View>

          </View>
          <View style={styles.book}>
            <Image style={styles.imagebook} source={require('../../src/assets/images/Dac-Nhan-Tam.jpg')} />
            <View style={styles.in4book}>
              <Text style={styles.nameBook}> Tên Sách</Text>
              <Text style={styles.nameAuthor}> Tên tác giả</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.doneprocess}>
                  <Text style={{ marginStart: 7, marginTop: 15, color: '#272956', fontWeight: "500" }}>Đã đọc</Text>
                  <View style={styles.process}>
                    <Text style={{ color: '#272956', fontWeight: "500" }}>50%</Text>
                  </View>
                </View>

                <View style={styles.processbar}>
                  <View style={{ // Thanh màu xám
                    height: 10,
                    width: '70%',
                    backgroundColor: '#cdcdcd',
                    borderRadius: 5
                  }} />
                  <View style={styles.processbar2}>
                    <View style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 5,
                      backgroundColor: '#D44445'

                    }} />
                  </View>
                </View>



              </View>
            </View>
            <Image style={styles.image3cham} source={require('../../src/assets/images/ic3cham.png')} />
          </View>
          <View style={styles.book}>
            <Image style={styles.imagebook} source={require('../../src/assets/images/Dac-Nhan-Tam.jpg')} />
            <View style={styles.in4book}>
              <Text style={styles.nameBook}> Tên Sách</Text>
              <Text style={styles.nameAuthor}> Tên tác giả</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.doneprocess}>
                  <Text style={{ marginStart: 7, marginTop: 15, color: '#272956', fontWeight: "500" }}>Đã đọc</Text>
                  <View style={styles.process}>
                    <Text style={{ color: '#272956', fontWeight: "500" }}>50%</Text>
                  </View>
                </View>
                <View style={styles.processbar}>
                  <View style={{ // Thanh màu xám
                    height: 10,
                    width: '70%',
                    backgroundColor: '#cdcdcd',
                    borderRadius: 5
                  }} />
                  <View style={styles.processbar2}>
                    <View style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 5,
                      backgroundColor: '#D44445'

                    }} />
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.image3cham} source={require('../../src/assets/images/ic3cham.png')} />
          </View>
          <View style={styles.book}>
            <Image style={styles.imagebook} source={require('../../src/assets/images/Dac-Nhan-Tam.jpg')} />
            <View style={styles.in4book}>
              <Text style={styles.nameBook}> Tên Sách</Text>
              <Text style={styles.nameAuthor}> Tên tác giả</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <View style={styles.doneprocess}>
                  <Text style={{ marginStart: 7, marginTop: 15, color: '#272956', fontWeight: "500" }}>Đã đọc</Text>
                  <View style={styles.process}>
                    <Text style={{ color: '#272956', fontWeight: "500" }}>50%</Text>
                  </View>
                </View>
                <View style={styles.processbar}>
                  <View style={{ // Thanh màu xám
                    height: 10,
                    width: '70%',
                    backgroundColor: '#cdcdcd',
                    borderRadius: 5
                  }} />
                  <View style={styles.processbar2}>
                    <View style={{
                      height: 10,
                      width: '35%',
                      borderRadius: 5,
                      backgroundColor: '#D44445'

                    }} />
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.image3cham} source={require('../../src/assets/images/ic3cham.png')} />
          </View>
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
    padding:25,
  },

  container: {
    backgroundColor: '#ffffff',
    flex:1,
  },
  bodyContainer: {
    backgroundColor: '#e6e6e6',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow: 'hidden',
    flex:1,
    padding:10
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
    borderBottomWidth:1,
    paddingBottom:15,
    borderBottomColor:'#D9D9D9'
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


});

export default LibraryScreen;