import { Image, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#F2F2F2";
const icon_color = "#C4C4C4";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon style={styles.menu} name='menu' size={22} />
        <Image style={styles.tok} source={require('../assets/images/Group3.png')} />

        <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: color_txt1 }}>Welcome back, Bunny!</Text>
        <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>What do you want to{'\n'} read today?</Text>
      </View>
      <View style={styles.search}>
        <Icon2 style={styles.icon} name='search1' size={18} />
        <TextInput style={styles.txtsearch} placeholder='Search' placeholderTextColor={icon_color}></TextInput>
        <Icon3 style={styles.icon} name='microphone' size={18} />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }, header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 21
  },
  tok: {
    marginLeft: 190
  }, profile: {
    marginTop: -6
  }, title: {
    marginLeft: 21
  }, search: {
    margin: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colorsearch,
    borderRadius: 10

  }, txtsearch: {
    width: 300,
    color: icon_color,
  
  },
  icon: {
    marginTop: 14,
    color: icon_color
  }
})