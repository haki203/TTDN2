import { Image, StyleSheet, Text, View, TextInput, FlatList, ScrollView  } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Screen1 from './tab_view/Screen1'
import Screen2 from './tab_view/Screen2'




const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#e6e6e6";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";
const color_search = "black";

const HomeScreen = (props) => {
  const { navigation } = props;
  const NovelRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation}/>
    </ScrollView>
    
  );
  const SelfRoute = () => (
    <ScrollView>
    <Screen1 navigation={navigation}/>
  </ScrollView>
  );
  const ScienceRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation}/>
    </ScrollView>

  );
  const RomanceRoute = () => (
    <ScrollView>
      <Screen1 navigation={navigation}/>
    </ScrollView>

  );
  const CrimeRoute = () => (
    <ScrollView>
    <Screen1 navigation={navigation}/>
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
        <Icon style={styles.menu} name='menu' size={22} />
        <Image style={styles.tok} source={require('../assets/images/Group3.png')} />

        <Image style={styles.profile} source={require('../assets/images/profile1.png')} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: color_txt1 }}>Welcome back, Bunny!</Text>
        <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2 }}>What do you want to{'\n'} read today?</Text>
      </View>
      <View style={styles.search}>
        <Icon2 style={styles.icon} name='search1' size={18} />
        <TextInput style={styles.txtsearch} placeholder='Search' placeholderTextColor={icon_color}></TextInput>
        <Icon3 style={styles.icon} name='microphone' size={18} />
      </View>  
      <TabView
        style={styles.tab}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
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
    padding: 21,
  },
  tok: {
    marginLeft: 190
  }, profile: {
    marginTop: -6
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
  },tab:{
    marginLeft:20,
    height:'auto',

  }
 
})

