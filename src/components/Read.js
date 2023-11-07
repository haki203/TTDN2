/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../navigation/AppContext';
import PDF from 'react-native-pdf';
const backgroundColor1 = '#FDFDFD';
const headerNameBoColorBo = '#272956';
const headerNameBoColorAu = '#9D9D9D';
const noidungColor = '#9D9D9D';
const Read = props => {
  const {isTabVisible, setIsTabVisible} = useContext(AppContext);
  const {navigation} = props;
  const PdfResource= require('../assets/pdf/dacnhantam.pdf');
  const Back = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(false);
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={Back}>
          <Image source={require('../assets/images/ic_left.png')} />
        </TouchableOpacity>
        <View style={styles.header_Name}>
          <Text style={styles.header_Name_Bo}>Catcher in the Rye</Text>
          <Text style={styles.header_Name_Au}>J.D. Salinger</Text>
        </View>
        <TouchableOpacity>
          <Image source={require('../assets/images/ic_3cham.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <PDF
          style={styles.body_NoiDung}
          trustAllCerts={false} // bỏ qua chứng chỉ ssl
          source={PdfResource}
          page={1} //hiển thị trang số 1 đầu tiên
          scale={1.5} // tỉ lệ phóng ban đầu
          minScale={1} // tỉ lệ phóng nhỏ nhất
          maxScale={2.0} // tỉ lệ phóng lớn nhất
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size="large" />
          )} // hiển thị loading
          enablePaging={false} // bật chế độ phân trang
          onLoadProgress={percentage =>
            console.log(`---------------------Loading :${percentage}`)
          } // hiển thị phần trăm loading
          onLoadComplete={(numberOfPage, filePath) => {
            console.log(
              `---------------Loading complete. Number of pages: ${numberOfPage}`,
            );
          }} // hiển thị khi load xong
          onPageChanged={(page, totalPages) =>
            console.log(`-----------------------${page}/${totalPages}`)
          } //  hiển thị số trang
          onError={error => console.log(error)} // hiển thị lỗi
          // onPageSingleTap={page => alert(page)} // hiển thị khi click vào trang
          onPressLink={link => Linking.openURL(link)} // hiển thị khi click vào link
          // onScaleChanged={scale => console.log(scale)} // hiển thị khi thay đổi tỉ lệ phóng
          // singlePage={true}
          spacing={5} // khoảng cách giữa 2 trang
        />
      </View>
    </View>
  );
};

export default Read;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: backgroundColor1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header_Name: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header_Name_Bo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: headerNameBoColorBo,
  },
  header_Name_Au: {
    fontSize: 17,
    color: headerNameBoColorAu,
    fontWeight: '600',
  },
  body: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body_NoiDung: {
    flex: 1,
    width: Dimensions.get('window').width + 40,
    height: Dimensions.get('window').height,
    fontSize:12,
    backgroundColor:'black'
  },
});
