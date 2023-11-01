import { Image, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { AppContext } from '../navigation/AppContext'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Screen1 from './tab_view/Screen1'
import Screen2 from './tab_view/Screen2'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setIsTabVisible(true)
    });

    return unsubscribe;
  }, []);

  const NovelRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation} />
    </ScrollView>

  );
  const SelfRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation} />
    </ScrollView>
  );
  const ScienceRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation} />
    </ScrollView>

  );
  const search = () => (
    navigation.navigate('SearchScreen')

  );
  const settings = () => (
    navigation.navigate('Setting')

  );
  const RomanceRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation} />
    </ScrollView>

  );
  const CrimeRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation} />
    </ScrollView>

  );
  const renderScene = SceneMap({
    Novel: NovelRoute,
    Self: SelfRoute,
    Science: ScienceRoute,
    Romance: RomanceRoute,
    Crime: CrimeRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Novel', title: 'Novel' },
    { key: 'Self', title: 'Self-love' },
    { key: 'Science', title: 'Science' },
    { key: 'Romance', title: 'Romance' },
    { key: 'Crime', title: 'Crime' },
  ]);




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
        <Text style={{ fontSize: 16, fontWeight: '500', color: color_txt1 }}>Welcome back, Bunny!</Text>
        <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>What do you want to{'\n'}read today?</Text>
      </View>
      <TabView
        style={styles.tab}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        scrollEnabled={false}

      />
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

  }

})

