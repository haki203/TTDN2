import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ItemFilter from './ItemFilter'
import ItemButtonFilter from './ItemButtonFilter'
import ItemSearch from './ItemSearch'

const CategoryFilterScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/images/Study.png')}></Image>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 38, marginHorizontal: 170 }}>
                <View style={{ width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
                <View style={{ marginLeft: 4, width: 26, height: 6, backgroundColor: '#D55555', borderRadius: 3 }} />
                <View style={{ marginLeft: 4, width: 15, height: 6, backgroundColor: 'rgba(213, 85, 85, 0.15)', borderRadius: 3 }} />
            </View>
            <View style={styles.buttonFilter}>
                <FlatList
                    data={dataNe}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                />
                <FlatList style={{marginTop: 8}}
                    data={dataNe1}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                />
                <FlatList style={{marginTop: 8}}
                    data={dataNe2}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                />
                <FlatList style={{marginTop: 8}}
                    data={dataNe3}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                />
            </View>
            <View style={styles.filter}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ItemFilter products={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Go')} style={styles.button}>
                    <Text style={styles.textButton}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryFilterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD'
    },
    button: {
        paddingVertical: 17,
        paddingHorizontal: 69,
        backgroundColor: '#D45555',
        display: 'flex',
        borderRadius: 10,
        marginTop: 59,
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        fontStyle: 'normal',
        lineHeight: 18,
        fontFamily: 'Poppins'
    },
    filter: {
        marginHorizontal: 63,
        marginTop: 15,
    },
    buttonFilter: {
        marginTop: 35,
        marginHorizontal: 62
    },
})

const data = [
    { id: '3' },
    // Thêm các mục dữ liệu khác vào đây
];
const dataNe = [
    { id: '1', category: 'Art', isClicked: false },
    { id: '2', category: 'Business', isClicked: false },
    { id: '3', category: 'Biography', isClicked: false }
];
const dataNe1 = [
    { id: '1', category: 'Comedy', isClicked: false },
    { id: '2', category: 'Culture', isClicked: false },
    { id: '3', category: 'Education', isClicked: false }
];
const dataNe2 = [
    { id: '1', category: 'News', isClicked: false },
    { id: '2', category: 'Philosophy', isClicked: false },
    { id: '3', category: 'Psychology', isClicked: false }

];
const dataNe3 = [
    { id: '1', category: 'Technology', isClicked: false },
    { id: '2', category: 'Travel', isClicked: false },


];