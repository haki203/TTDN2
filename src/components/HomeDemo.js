import { Image, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { AppContext } from '../navigation/AppContext'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Screen1Demo from './tab_view/Screen1Demo'
import AxiosIntance from '../axios/AxiosIntance'
import Theloai from './tab_view/Theloai'
import Tacgia from './tab_view/Tacgia'

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#e6e6e6";
const icon_color = "#C4C4C4";
const color_search = "black";
const color_logo = '#272956';
const color_text = "#272956";


const HomeDemo = (props) => {
  const { isTabVisible, setIsTabVisible } = useContext(AppContext);
  const { infoUser } = useContext(AppContext);
  const { navigation } = props;
  const [dataNe, setdataNe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });

    return unsubscribe;
  }, []);


  const search = () => (
    navigation.navigate('SearchDemo')

  );
  const settings = () => (
    navigation.navigate('GoLogin')

  );
  const RomanceRoute = (id) => (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <Screen1Demo navigation={navigation} id={id} />
    </ScrollView>

  );
  const TheloaiRoute = (id) => (

    <Theloai navigation={navigation} toggleModal={toggleModal} id={id} />


  );
  const TacgiaRoute = () => (

    <Tacgia navigation={navigation} toggleModal={toggleModal} />


  );




  const renderScene = ({ route }) => {

    return RomanceRoute(route.key);


  }
  const SecondTabRenderScene = SceneMap({
    first: TheloaiRoute,
    second: TacgiaRoute,
    // Thêm các tab khác nếu cần
  });

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);
  const [secondTabIndex, setSecondTabIndex] = useState(0);

  const secondTabRoutes = [
    { key: 'first', title: 'Thể loại' },
    { key: 'second', title: 'Tác giả' },
  ];
  const { } = useState([]);


  useEffect(() => {
    const getAllCate = async () => {
      const respone = await AxiosIntance().get("/product/category/getAlls");
      const newArray = [];
      for (const item of respone.category) {
        const newItem = { key: item._id, title: item.name };
        newArray.push(newItem);
      }
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
      tabStyle={{ width: 'auto' }}
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
  const renderTabBar2 = props => (

    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#FF5E00', height: 3 }}
      style={{ backgroundColor: 'transparent' }}
      scrollEnabled={true}

      tabStyle={{ width: "auto", textAlign: 'left', alignItems: 'flex-start' }}
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
          <Text style={styles.authen}>Athens</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 21 }}>
          <TouchableOpacity onPress={search}>
            <Image style={styles.tok} source={require('../assets/images/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={settings}>
            <Image style={styles.profile} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1656px-User_icon-cp.svg.png' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: color_txt1 }}>Chào mừng bạn trở lại, {infoUser.name}!</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>Bạn muốn đọc sách gì?</Text>
          <View style={styles.viewall}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon style={styles.menuall} name="menu-book" size={20} color='#2D5ED5' />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading?(
          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%' }}>
            <View style={styles.containerModal}>
              <TabView
                navigationState={{ index: secondTabIndex, routes: secondTabRoutes }}
                renderScene={SecondTabRenderScene}
                onIndexChange={setSecondTabIndex}
                renderTabBar={renderTabBar2}
              />
              <Icon2 onPress={toggleModal} style={styles.Close} name="closecircleo" size={28} color="#272956" />
            </View>
          </View>
        </Modal>
        ):
        (
          <View><ActivityIndicator size={30} color={'black'}/></View>
        )}
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

export default HomeDemo

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
    height: 40,
    borderRadius: 35,
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
    marginLeft: 20,
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
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: '#cdcdcd',
    textAlign: 'left',
    marginLeft: -7

  },
  activeLabel: {
    color: 'black',
    textAlign: 'left'
  }, menuall: {

  }, viewall: {
    padding: 8,
    backgroundColor: '#C5BFDD',
    marginTop: -30,
    position: 'absolute',
    right: 20,
    marginTop: 17,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }, containerModal: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10
  }, Close: {
    position: 'absolute',
    right: 15,
    top: 15
  }, titleModal: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    position: 'absolute',
    left: 20,
    top: 15
  }, bodyModal: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: 50,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  itembody: {
    flexDirection: 'row',
  },
  itemTxt: {
    color: color_text,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 15
  }, itemicon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#D8F2F3',
    alignItems: 'center',
    justifyContent: 'center',
  }

})

