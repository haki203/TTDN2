import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Entypo"
import Icon2 from "react-native-vector-icons/AntDesign"
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import AxiosIntance from '../axios/AxiosIntance'

const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const log_outcolor = "#F77A55";
const ItemListView = (props) => {
  const { dulieu, navigation } = props;
  const [isModalVisible, setModalVisible] = useState(false);


  const rightSwipeable = () => {
    return (
      <View style={{ marginTop: 16, height: 80 }}>
        <TouchableOpacity onPress={deleteFavorite} style={{ width: 80, height: 80, backgroundColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }}>
          <Icon2 name='delete' size={20} />
        </TouchableOpacity>
      </View>
    )
  };
  const deleteFavorite = async () => {

    console.log(dulieu._id);
    const response = await AxiosIntance().get("/favourite/delete/", dulieu._id)
    if (response.result == true) {
      console.log("xóa thành công");
      ToastAndroid.show("Xóa thành côngr", ToastAndroid.SHORT);

    }
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Swipeable renderLeftActions={false} renderRightActions={rightSwipeable}>

          <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: dulieu._id })} >
            <View style={styles.body}>
              <Image style={styles.image} source={{ uri: dulieu.image }} />
              <View style={styles.name}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.book_name} >{dulieu.title}</Text>
                  <Text style={styles.author_name}>{dulieu.authorId}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleModal(dulieu)}>
                <Icon style={styles.icon} name='dots-three-vertical' size={20} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

        </Swipeable>

      </GestureHandlerRootView>
    </View>
  );
}

export default ItemListView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 5
  }, image: {
    margin: 10,
    width: 60,
    height: 80,
    borderRadius: 10,
  }, name: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  }, book_name: {
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
  }
  , modal: {
    width: 100,
    height: 50,
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
    borderRadius: 7
  }
})