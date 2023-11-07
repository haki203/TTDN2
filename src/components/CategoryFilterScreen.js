import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import ItemFilter from './ItemFilter'
import ItemButtonFilter from './ItemButtonFilter'
import ItemSearch from './ItemSearch'
const { width, height } = Dimensions.get('window');
const CategoryFilterScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <View>
                <Image style={{ height: height / 2.2 }} source={require('../assets/images/Study.png')}></Image>
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
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    horizontal={true}
                />
                <FlatList style={{ marginTop: 8 }}
                    data={dataNe1}
                    scrollEnabled={false}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                />
                <FlatList style={{ marginTop: 8 }}
                    data={dataNe2}
                    scrollEnabled={false}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                />
                <FlatList style={{ marginTop: 8 }}
                    data={dataNe3}
                    scrollEnabled={false}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                />
            </View>
            <View style={styles.filter}>
                <FlatList
                    data={data}
                    scrollEnabled={false}
                    renderItem={({ item }) => <ItemFilter products={item} />}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={{ alignItems: 'center', position: 'absolute', end: '50%', bottom: height * 0.08, start: '50%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Go')} style={styles.button}>
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryFilterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        marginTop: 25
    },
    button: {
        padding:15,
        backgroundColor: '#D45555',
        borderRadius: 10,
        width:140,
        alignItems:'center'
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
        marginHorizontal: 60,
        width:'100%'
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