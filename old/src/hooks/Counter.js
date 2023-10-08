/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react";
import  CounterContext  from "./CounterContext.js";
import { StyleSheet, Text, View } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Sử dụng useEffect để cập nhật số đếm mỗi giây
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  // Sử dụng useContext để lấy giá trị của biến trạng thái `count` từ context
  const countFromContext = useContext(CounterContext);

  return (

    <View styles={styles.container}>
      <Text style={styles.view1}>Số đếm hiện tại: {count}</Text>
      <Text style={styles.view2}>Số đếm từ context: {countFromContext}</Text>
    </View>
  );
};


export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#E7B383',
  },
  view1: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  view2:{
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  }
});