import { StyleSheet, Text, View,Image } from 'react-native'
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
      <Image  style={styles.image} source={dulieu.image} />
      <View style={styles.name}>
        <Text style={styles.book_name} >{dulieu.book_name}</Text>
      <Text style={styles.author_name}>{dulieu.author_name}</Text>
      </View> 
      <Icon style={styles.icon} name='dots-three-vertical' size={20}/>
    </View>
  )
}

export default ItemListView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height:70,

    },image:{
        margin:10

    },name:{
        width:200,
        flexDirection: 'column',
        justifyContent:'center',
        paddingLeft:10
    },book_name:{
        color: color_text,
        fontFamily:'Poppins',
        fontSize:15,
        fontStyle:'normal',
        fontWeight:'700'
    },
    icon:{
        padding:23,
        marginLeft:15
    }
})