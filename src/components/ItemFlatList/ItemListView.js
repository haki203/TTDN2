import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import AxiosIntance from '../../axios/AxiosIntance';

const color_text = '#272956';
const color_view = '#4838D1';
const bgcolor = '#FFFFFF';
const log_outcolor = '#F77A55';
const ItemListView = props => {
  const {dulieu, navigation, reloadItem} = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showalert = () => {
    Alert.alert(
      //title
      'Xóa sách yêu thích',
      //body
      'Bạn có chắc chắn muốn xóa khỏi sách yêu thích ?',
      [
        {
          text: 'Có',
          onPress: () => deleteFavorite(),
        },
        {
          text: 'Không',
          onPress: () => setModalVisible(!isModalVisible),
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };
  const deleteFavorite = async () => {
    console.log('id favourite ne: ', dulieu.favourite._id);
    try {
      const response = await AxiosIntance().get(
        '/product/favourite/delete/' + dulieu.favourite._id,
      );
      if (response.result == true) {
        console.log('xóa thành công');
        ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
        // reload lai
        reloadItem();
        toggleModal();
      } else {
        ToastAndroid.show(
          'Xóa ko thành công ' + response.error,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //() => console.log("id cua ", dulieu.book.title, " ne: ", dulieu.favourite._id)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailScreen', {itemId: dulieu.book._id})
        }>
        <View style={styles.body}>
          <Image style={styles.image} source={{uri: dulieu.book.image}} />
          <View style={styles.name}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.book_name}>{dulieu.book.title}</Text>
              <Text style={{color: 'black'}}>{dulieu.book.authorId}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              style={styles.icon}
              name="dots-three-vertical"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
              }}>
              <View style={styles.containerModal}>
                <Text style={styles.titleModal}>Tùy chọn</Text>
                <View style={styles.bodyModal}>
                  <TouchableOpacity onPress={showalert}>
                    <View style={styles.itembody}>
                      <View style={styles.itemicon}>
                        <Icon2 name="delete" color="#272956" size={13} />
                      </View>
                      <Text style={styles.itemTxt}>Xóa khỏi mục yêu thích</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        'Detail',
                        {itemId: dulieu.book._id},
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
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
  },
  image: {
    margin: 10,
    width: 60,
    height: 80,
    borderRadius: 10,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  book_name: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  icon: {
    padding: 40,
    marginLeft: 30,
  },
  body: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
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
