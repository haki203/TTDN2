import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemFilter = (props) => {
    const {products} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.txt_1}>{products.key}</Text>
      <Text style={styles.txt_1}>topics Selected</Text>
    </View>
  )
}

export default ItemFilter

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    txt_1:{
        color:'#2E2E5D',
        fontSize: 14,
        fontWeight: '400',
        fontStyle:'normal',
        lineHeight: 18,
        paddingLeft: 7
    }
})