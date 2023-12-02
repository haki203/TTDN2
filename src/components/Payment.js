import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import crypto from 'crypto-js';
import moment from 'moment';
import axios from 'axios';

const Payment = () => {
    const config = {
        app_id: '2553',
        key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
        endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Demon - Payment for the order #${transID}`,
        bank_code: 'zalopayapp',
    };

    const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
    order.mac = crypto.HmacSHA256(data, config.key1).toString();

    const goiapi = async () => {
        try {
            const response = await axios.post(config.endpoint, null, { params: order });
            console.log(response.data);
            Linking.openURL(response.data.order_url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goiapi}>
                <Text>App</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Payment;
