import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
import React, { useState, useContext, useEffect } from 'react';

const Navigate = (props) => {
    const { navigation } = props;
    const { itemId } = props.route.params;
    const [, updateState] = useState();

    // Hàm để buộc render lại màn hình
    const forceUpdate = () => updateState({});
    useEffect(() => {
        let id = itemId;

        navigation.navigate('Detail', { itemId: id });

    }, []);
    return (
        <View style={styles.loading}><ActivityIndicator size={35} color={'black'} /></View>
    )
}

export default Navigate

const styles = StyleSheet.create({
    loading: { width: width, height: height, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },
})