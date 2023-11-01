import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const ItemButtonFilter = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const [key, setKey] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const { product, products } = props;
    const handlePress = () => {
        // Khi mục được nhấp vào, đảo ngược trạng thái isSelected
        setIsSelected(!isSelected);
        setKey(key + 1);
        setEventCount(eventCount + 1);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.content,
            { backgroundColor: isSelected ? '#4838D1' : '#FDFDFD' },]} onPress={handlePress}>
                <Text style={[styles.nameFilter, { color: isSelected ? '#FDFDFD' : '#4838D1' }]}>{product.category}</Text>
            </TouchableOpacity>
            {/* <View style={styles.container}>
                <Text style={styles.txt_1}>{eventCount}</Text>
                <Text style={styles.txt_1}>topics Selected</Text>
            </View> */}
        </View>
    )
}

export default ItemButtonFilter

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        display: 'flex',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#4838D1',
        padding: 10,
        borderStyle: 'solid',
        marginLeft: 8
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nameFilter: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4838D1',
        fontStyle: 'normal',
        lineHeight: 18,
        fontFamily: 'Poppins'
    }
})