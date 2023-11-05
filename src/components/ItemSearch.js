import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import AxiosIntance from '../axios/AxiosIntance';
const bacroundColor = '#272956';
const ColorAuthor = '#4838D1';
const ItemSearch = (props) => {
  const { product, navigation, author } = props;
  
  return (
    <TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.image1} source={{ uri: product.image }}></Image>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.nameBook}>{product.title}</Text>
          <Text style={styles.category}>{product.authorId.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ItemSearch

const styles = StyleSheet.create({
  image1: {
    width: 71,
    height: 106,
    display: 'flex',
    flexShrink: 0,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 23
  },
  nameBook: {
    marginTop: 23,
    color: bacroundColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18
  },
  category: {
    color: ColorAuthor,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    marginTop: 3
  },
})