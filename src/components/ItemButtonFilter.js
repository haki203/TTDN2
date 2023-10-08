import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ItemButtonFilter = (props) => {
    const {product} = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.content}>
                <Text style={styles.nameFilter}>{product.category}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemButtonFilter

const styles = StyleSheet.create({
    content:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        display: 'flex',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#4838D1',
        padding: 10,
        borderStyle: 'solid',
        marginHorizontal: 70,
    },
    container:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    nameFilter:{
        fontSize: 14,
        fontWeight: '500',
        color: '#4838D1',
        fontStyle: 'normal',
        lineHeight: 18
    }
})