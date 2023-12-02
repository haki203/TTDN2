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
  FlatList,
  ToastAndroid,
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
  const {infoUser} = useContext(AppContext);
  const {dulieu, navigation, reloadItem} = props;

  const {id} = props.route.params;
  const route = props.route;
  const [isLoading, setIsLoading] = useState(true);

  const [AuthorData, setAuthorData] = useState({});
  const [dataMucluc, setDataMucluc] = useState([]);
  const [bookData, setBookData] = useState({});
  const [pdfResource, setPdfResource] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState();
  const [numberOfPagehaha, setNumberOfPagehaha] = useState();
  const AuthorBook = async id => {
    try {
      const response = await AxiosIntance().get('/product/author/' + id);
      //console.log(response, 'author');
      if (response.result) {
        const Data1 = {
          authorname: response.author.name,
        };
        setAuthorData(Data1);
        mucluc();
      }
    } catch (error) {}
  };
  const DetailBook = async () => {
    const response = await AxiosIntance().get('/product/' + id);
    if (response.result) {
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
    }
    //setIsLoading(false);
  };
  const mucluc = async () => {
    try {
      const response = await AxiosIntance().get('/product/get-muc-luc/' + id);
      console.log(response);
      if (response.result) {
        setDataMucluc(response.ml);
      }
      setIsLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    DetailBook();
  }, []);

  console.log('id book: ', id);

  const UpdateProgress = async () => {
    try {
      const response = await AxiosIntance().post(
        '/product/library/updateProgress',
        {
          bookId: id,
          userId: infoUser.id,
          newIndex: numberOfPagehaha,
        },
      );
      console.log('id book:--------->', id);
      console.log('id user:--------->', infoUser.id);
      console.log('book:--------->', numberOfPagehaha);

      console.log('UpdateProgress:--------->', response);
    } catch (error) {
      console.log('loi update progress', error);
    }
  };

  // useEffect(() => {
  // },[]);

  const Back = () => {
    UpdateProgress();
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

  const ItemChuong = ({item}) => {
    const {id, title, chuong} = item;
    const onPressItem = () => {
      setModalVisible(false);
      setPage(item.position);
      console.log('chuyen sang trang doc', id);
    };

    // useEffect(() => {
    //   const GetProgress = async () => {
    //     try {
    //       const response = await AxiosIntance().post('product/continue/getProgress', {
    //         userId: idUser,
    //         bookId: id,
    //         newIndex: page,
    //       });
    //       console.log(response);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   GetProgress();

    // }, []);

    return (
      <View>
        <TouchableOpacity onPress={onPressItem}>
          <Text style={styles.itemTxt}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  try {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={{padding: 10}} onPress={Back}>
            <Image source={require('../assets/images/ic_left.png')} />
          </TouchableOpacity>
          <View style={styles.header_Name}>
            {isLoading ? (
              <Text style={styles.header_Name_Bo}>...</Text>
            ) : (
              <Text style={styles.header_Name_Bo}>
                {limitText(bookData.title)}
              </Text>
            )}
            {isLoading ? (
              <Text style={styles.header_Name_Au}>...</Text>
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
            <View
              onPress={toggleModal}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
              }}>
              <View style={styles.containerModal}>
                <Text style={styles.titleModal}>Chọn Chương</Text>
                <View style={styles.bodyModal}>
                  <FlatList
                    data={dataMucluc}
                    renderItem={({item}) => (
                      <ItemChuong item={item} navigation={navigation} />
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={true}
                  />
                </View>
                <Icon2
                  onPress={toggleModal}
                  style={styles.Close}
                  name="closecircleo"
                  size={28}
                  color="#272956"
                />
              </View>
            </View>
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
                backgroundColor: 'white',
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
              page={page} //hiển thị trang số 1 đầu tiên
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
                setIsLoading(false);
              }} // hiển thị khi load xong
              onPageChanged={(page, totalPages) => {
                console.log(`-----------------------${page}/${totalPages}`);
                setNumberOfPagehaha(page);
              }} //  hiển thị số trang
              onError={error => setIsLoading(true)} // hiển thị lỗi
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
  } catch (error) {
    console.log('loi ne: ', error);
    setIsLoading(true);
  }
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
  },
  containerModal: {
    width: '100%',
    height: '45%',
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
    height: '100%',
    position: 'absolute',
    top: 50,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  itemTxt: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 15,
    paddingTop: 60,
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

const dataChuong = [
  {id: 1, title: 'Chuyến hành trình của giấc mơ', chuong: 1, position: 1},
  {id: 2, title: 'Lời mách bảo của trái tim', chuong: 2, position: 9},
  {id: 3, title: 'Người bán dầu thơm', chuong: 3, position: 19},
];
