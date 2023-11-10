import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Entypo"
import Icon2 from "react-native-vector-icons/AntDesign"


const color_text = "#272956";
const color_view = "#4838D1";
const bgcolor = "#FFFFFF";
const log_outcolor = "#F77A55";
const ItemListView = (props) => {
  const { dulieu, navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: dulieu._id })} >
        <View style={styles.body}>
          <Image style={styles.image} source={{ uri: dulieu.image }} />
          <View style={styles.name}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.book_name} >{dulieu.title}</Text>
              <Text style={styles.author_name}>{dulieu.authorId}</Text>
            </View>
          </View>
          <Icon style={styles.icon} name='dots-three-vertical' size={20} />
        </View>
      </TouchableOpacity>
    </View>
  )
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
    padding: 23,
    marginLeft: 30,
  },
  body: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})