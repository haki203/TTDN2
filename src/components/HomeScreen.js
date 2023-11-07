import { Image, StyleSheet, Text, View, TextInput, FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { AppContext } from '../navigation/AppContext'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Screen1 from './tab_view/Screen1'
import Screen2 from './tab_view/Screen2'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AxiosIntance from '../axios/AxiosIntance'

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#e6e6e6";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";
const color_search = "black";
const color_logo = '#272956';

const HomeScreen = (props) => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const { navigation } = props;
  const [dataNe, setdataNe] = useState([]);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });

    return unsubscribe;
  }, []);


  const search = () => (
    navigation.navigate('SearchScreen')

  );
  const settings = () => (
    navigation.navigate('Profile')

  );
  const RomanceRoute = (id) => (
    <ScrollView>
      <Screen1 navigation={navigation} id={id} />
    </ScrollView>

  );



  const renderScene = ({ route }) => {

    return (RomanceRoute(route.key));
  }
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([

  ]);
  const { } = useState([]);

  console.log(routes);

  useEffect(() => {
    const getAllCate = async () => {
      const respone = await AxiosIntance().get("/product/category/getAlls");

      console.log(respone.category);

      const newArray = [];

      for (const item of respone.category) {
        const newItem = { key: item._id, title: item.name };
        newArray.push(newItem);
      }
      console.log(newArray);

      if (newArray.length > 0) {
        setRoutes(newArray);
        setIndex(0);
      }

      if (respone.result == true) {

        setdataNe(respone.category)
      } else {
        ToastAndroid.show("get data", ToastAndroid.SHORT);
      }
    }
    getAllCate();


  }, [])


  const renderTabBar = props => (

    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#FF5E00', height: 3 }}
      style={{ backgroundColor: 'transparent' }}
      scrollEnabled={true}
      gap={10}
      tabStyle={{ width: "auto" }}
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        props.setTabBarWidth(props.navigationState.index, width);
      }}
      renderLabel={({ route, focused }) => {
        return (
          <Text
            style={[styles.label, focused ? styles.activeLabel : styles.label]}
          >
            {route.title}
          </Text>
        );
      }}
      pressColor={'transparent'}

    />

  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: 'center', flexDirection: 'row', paddingLeft: 21, flex: 1 }}>
          <Image style={styles.menu} source={require('../assets/images/logo2.png')} size={22} />
          <Text style={styles.authen}>Authens</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={settings}>
            <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: color_txt1 }}>Chào mừng bạn trở lại, Bunny!</Text>
        <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>Bạn muốn đọc sách gì?</Text>
      </View>
      <>{
        routes.length > 0 &&
        <TabView
          style={styles.tab}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          scrollEnabled={false}
        />
      }</>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tok: {
    width: 40,
    height: 40,
    marginRight: 8
  }, profile: {
    width: 40,
    height: 40
  }, title: {
    marginLeft: 21
  }, search: {
    margin: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colorsearch,
    borderRadius: 10,


  }, txtsearch: {
    width: 300,
    color: color_search,

  },
  icon: {
    marginTop: 14,
    color: icon_color
  }, tab: {
    marginLeft: 10,
    height: 'auto',

  },
  menu: {
    width: 40,
    height: 40
  },
  authen: {
    marginLeft: 8,

    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: color_logo,
    letterSpacing: 0.5

  },
  label:{
    fontWeight:'500',
    fontSize:16
  },
  activeLabel:{
    color:'black',

  }

})

