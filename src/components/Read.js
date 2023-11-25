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
  fetch,
  Modal,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../navigation/AppContext';
import PDF from 'react-native-pdf';
import AxiosIntance from '../axios/AxiosIntance';
import Icon2 from 'react-native-vector-icons/AntDesign';
const color_text = '#272956';

const backgroundColor1 = '#FDFDFD';
const headerNameBoColorBo = '#272956';
const headerNameBoColorAu = '#9D9D9D';
const noidungColor = '#9D9D9D';

const Read = props => {
  const {isTabVisible, setIsTabVisible} = useContext(AppContext);
  const {dulieu, navigation, reloadItem} = props;

  const {id} = props.route.params;
  const route = props.route;
  const [isLoading, setIsLoading] = useState(true);

  const [AuthorData, setAuthorData] = useState({});
  const [bookData, setBookData] = useState({});
  const [pdfResource, setPdfResource] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const DetailBook = async () => {
      const response = await AxiosIntance().get('/product/' + id);
      const Data2 = {
        id: response.product._id,
        title: response.product.title,
        pdfLink: response.product.pdf,
        authorId: response.product.authorId,
        category: response.product.categoryId,
      };
      console.log(response.product.pdf);
      setBookData(Data2);
      setPdfResource(Data2.pdfLink);
      AuthorBook(Data2.authorId);
      setIsLoading(false);
    };
    DetailBook();

    const AuthorBook = async id => {
      const response = await AxiosIntance().get('/product/author/' + id);
      console.log(response, 'author');
      const Data1 = {
        authorname: response.author.name,
      };
      setAuthorData(Data1);
      setIsLoading(false);
    };

    AuthorBook();
  }, []);

  const Back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(false);
    });
    return unsubscribe;
  }, []);

  const limitText = text => {
    try {
      if (text.length > 20) {
        return text.substring(0, 20) + '...';
      } else {
        return text;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{padding: 10}} onPress={Back}>
          <Image source={require('../assets/images/ic_left.png')} />
        </TouchableOpacity>
        <View style={styles.header_Name}>
          {isLoading ? (
            <Text style={styles.header_Name_Bo}>
              Tên sách...
              <ActivityIndicator size={30} color={'#d6d6d6'} />
            </Text>
          ) : (
            <Text style={styles.header_Name_Bo}>
              {limitText(bookData.title)}
            </Text>
          )}
          {isLoading ? (
            <Text style={styles.header_Name_Au}>
              Tên tác giả...
              <ActivityIndicator size={30} color={'#d6d6d6'} />
            </Text>
          ) : (
            <Text style={styles.header_Name_Au}>
              {limitText(AuthorData.authorname)}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => setModalVisible(true)}>
          <Image source={require('../assets/images/ic_3cham.png')} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.containerModal}>
              <Text style={styles.titleModal}>Tùy chọn</Text>
              <View style={styles.bodyModal}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      'Detail',
                      {itemId: bookData.id},
                      toggleModal(),
                    )
                  }>
                  <View style={styles.itembody}>
                    <View style={styles.itemicon}>
                      <Icon2 name="info" color="#272956" size={15} />
                    </View>
                    <Text style={styles.itemTxt}>Thông tin sách</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Icon2
                onPress={toggleModal}
                style={styles.Close}
                name="closecircleo"
                size={28}
                color="#272956"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <View style={styles.body}>
        {isLoading ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={30} color={'black'} />
          </View>
        ) : (
          <PDF
            style={styles.body_NoiDung}
            trustAllCerts={false} // bỏ qua chứng chỉ ssl
            source={{
              uri: pdfResource,
              cache: true,
            }}
            page={1} //hiển thị trang số 1 đầu tiên
            scale={1} // tỉ lệ phóng ban đầu
            minScale={1} // tỉ lệ phóng nhỏ nhất
            maxScale={2.0} // tỉ lệ phóng lớn nhất
            cache={true} // lưu trữ tệp PDF trong bộ nhớ cache
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
        )}
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
    paddingBottom: 10,
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
    textAlign: 'center',
  },
  header_Name_Au: {
    fontSize: 17,
    color: headerNameBoColorAu,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body_NoiDung: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    fontSize: 12,
    backgroundColor: 'black',
  },
  containerModal: {
    width: '100%',
    height: '25%',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Close: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  titleModal: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    position: 'absolute',
    left: 20,
    top: 15,
  },
  bodyModal: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: 50,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  itembody: {
    flexDirection: 'row',
  },
  itemTxt: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 15,
  },
  itemicon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#D8F2F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
