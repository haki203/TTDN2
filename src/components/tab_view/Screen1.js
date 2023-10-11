import { Image, StyleSheet, Text, View, TextInput, FlatList, useWindowDimensions } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Feather"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const color_txt1 = "#9D9D9D";
const color_txt2 = "#272956";
const colorsearch = "#F2F2F2";
const icon_color = "#C4C4C4";
const namebook_color = "#272956";

const Screen1 = (props) => {

  const NovelRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );
  const SelfRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const ScienceRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const RomanceRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const CrimeRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
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

  
  const { navigation } = props;

  const renderItemPopularDeals = (props) => {
    const { item } = props;
    const { id, book_name, author_name, img } = item;
    return (
      <View style={styles.containername}>
        {/* Image */}
        <Image
          source={img}
          style={[styles.renderImagePopularDeals, { alignSelf: 'center', marginTop: 15 }]}
          shadowColor="black"
          shadowOffset={[5, 5]}
          shadowOpacity={1}
          shadowRadius={5}
        />

        {/* Text */}
        <View style={styles.containerText}>
          <Text style={styles.rendername}>{book_name}</Text>
          <Text style={styles.renderauthor}>{author_name}</Text>
        </View>
        {/* IconAdd */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{  flexGrow: 0, height: 340,with:'auto' }}
        data={dataImagePopularDeals}
        renderItem={renderItemPopularDeals}
        keyExtractor={item => item.id}
        horizontal={true}
        showsVerticalScrollIndicator={false}
      />
      <Text style={{ fontSize: 26, fontWeight: '500', color: color_txt2, }}>New Arrivals</Text>
      <FlatList
        style={{ flexGrow: 0, height: 340 ,with:'auto'}}
        data={dataImagePopularDeals}
        renderItem={renderItemPopularDeals}
        keyExtractor={item => item.id}
        horizontal={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({
  container: {
    height:'auto'
  },
  containerText: {

    marginTop: -10
  }, rendername: {
    color: namebook_color,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins'
  }
})

const dataImagePopularDeals = [
  { id: 0, book_name: 'Catcher in the Rye', author_name: 'J.D. Salinger', img: require('../tab_view/image/image103.png') },
  { id: 1, book_name: 'Mango', author_name: '1kg', img: require('../tab_view/image/image98.png'), },
  { id: 2, book_name: 'Banana', author_name: '1kg', img: require('../tab_view/image/image103.png') },
  { id: 3, book_name: 'Strawberry', author_name: '1kg', img: require('../tab_view/image/image98.png'), },
];