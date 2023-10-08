import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import axios from 'axios';
import ItemList from './ItemList';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = 'https://63e4d18d4474903105f27130.mockapi.io/food';
    //use axios
    // axios
    //   .get(apiUrl)
    //   .then(response => {
    //     // Xử lý dữ liệu trả về từ API ở đây
    //     setList(response.data);
    //     console.log(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     // Xử lý lỗi ở đây
    //     console.error('Error:', error);
    //   });
    
    // use fetch api
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      setList(data);
      console.log(data)
      setLoading(false);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error(error);
    });
  }, []);

  if (loading) {
    return (
      <Text
        style={{
          color: 'red',
          fontSize: 25,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        Loading...
      </Text>
    );
  }

  return (
    <SafeAreaView>
      <Text
        style={{
          color: 'red',
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        List
      </Text>
      <FlatList
        data={list}
        renderItem={item => <ItemList item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default List;
