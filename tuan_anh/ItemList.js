import React from 'react';
import {View, Image, Text} from 'react-native';

const ItemList = props => {
  const data = props.item;
  console.log(data);
  return (
    <View
      style={{
        width: '100%',
        padding: 15,
        flexDirection: 'row',
      }}>
      <Image
        source={{uri: data.item.avatar}}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <View style={{flexDirection: 'column', marginLeft: 20}}>
        <Text
          style={{
            color: 'red',
            fontSize: 18,
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}>
          Name: {data.item.name}
        </Text>
        <Text
          style={{
            color: 'blue',
            fontSize: 15,
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}>
          Price: {data.item.price}
        </Text>
        <Text
          style={{
            color: 'green',
            fontSize: 15,
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}>
          Price: {data.item.weight}
        </Text>
      </View>
    </View>
  );
};

export default ItemList;
