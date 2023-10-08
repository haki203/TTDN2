import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import ItemFilter from './ItemFilter'
import ItemButtonFilter from './ItemButtonFilter'

const CategoryFilterScreen = (props) => {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/images/Study.png')}></Image>
            </View>
            <View style={styles.buttonFilter}>
                <FlatList
                    data={dataNe}
                    renderItem={({ item }) => <ItemButtonFilter product={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
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
        lineHeight: 18
    },
    filter: {
        marginHorizontal: 63,
        marginTop: 20
    },
    buttonFilter: {
        flexDirection: 'column',
        marginTop: 73,
        width: 284,
        height: 140
    }
})

const data = [
    { key: '3' },

    // Thêm các mục dữ liệu khác vào đây
];
const dataNe = [
    { category: 'Art' },
    { category: 'Business' },
    { category: 'Biography' },
    { category: 'Comedy' },
    { category: 'Culture' },
    { category: 'Education' },
    { category: 'News' },
    { category: 'Philosophy' },
    { category: 'Psychology' },
    { category: 'Technology' },
    { category: 'Travel' },
    // Thêm các mục dữ liệu khác vào đây
];