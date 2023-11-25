import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';
import HotScreen from '../components/HotScreen';
import FavouriteScreen from '../components/FavouriteScreen';
import LibraryScreen from '../components/LibraryScreen';
import DetailScreen from '../components/DetailScreen';
import SearchScreen from '../components/SearchScreen';
import PlayScreen from '../components/play/PlayScreen';
import { AppContext } from './AppContext';
import SignUpScreen from '../components/SignUpScreen';
import CategoryFilterScreen from '../components/CategoryFilterScreen';
import ReadyGoScreen from '../components/ReadyGoScreen';
import Welcome from '../components/Welcome';
import BookDetail from '../components/BookDetail';
import Read from '../components/Read';
import SettingScreen from '../components/SettingScreen';
import ProfileScreen from '../components/ProfileScreen';
import LoginUser from '../components/LoginUser';
import WaitScreen from '../components/WaitScreen';
import Navigate from '../components/Navigate';
import Viewdetail from '../components/tab_view/Viewdetail';
import Theloai from '../components/tab_view/Theloai';
import Viewauthor from '../components/tab_view/Viewauthor';
import HomeDemo from '../components/HomeDemo';
import BookDetailDemo from '../components/BookDetailDemo';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="LoginUser" component={LoginUser} />
            <Stack.Screen name="Hello" component={ManChao} />
        </Stack.Navigator>
    )
}

const Mains = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Viewauthor" component={Viewauthor} />
            <Stack.Screen name="Viewdetail" component={Viewdetail} />
            <Stack.Screen name='Detail' component={BookDetail} />
            <Stack.Screen name='Navigate' component={Navigate} />
            <Stack.Screen name='Play' component={PlayScreen} />
            <Stack.Screen name='Read' component={Read} />
            <Stack.Screen name='Setting' component={SettingScreen} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Welcome' component={ManChao} />
            <Stack.Screen name='LoginUser' component={LoginUser} />
            <Stack.Screen name='WaitScreen' component={WaitScreen} />
        </Stack.Navigator>

    )
}
const Favourite = () => {
    return (
        <Stack.Navigator initialRouteName='Favourite' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Favourite' component={FavouriteScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="DetailScreen" component={BookDetail} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
        </Stack.Navigator>
    )
}
const Hot = () => {
    return (
        <Stack.Navigator initialRouteName='HotScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HotScreen' component={HotScreen} />
            <Stack.Screen name='SettingHot' component={SettingScreen} />
            <Stack.Screen name="SearchHot" component={SearchScreen} />
            <Stack.Screen name="PlayHot" component={PlayScreen} />
            <Stack.Screen name="DetailHot" component={BookDetail} />
        </Stack.Navigator>
    )
}
const Library = () => {
    return (
        <Stack.Navigator initialRouteName='LibraryScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LibraryScreen' component={LibraryScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}
const ManChao = () => {
    return (
        <Stack.Navigator initialRouteName='Sign' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Sign" component={SignUpScreen} />
            <Stack.Screen name='Filter' component={CategoryFilterScreen} />
            <Stack.Screen name='Go' component={ReadyGoScreen} />
        </Stack.Navigator>

    )
}


const Home = ({ scrollY }) => {
    // const isTabVisibleRedux = useSelector(state => state.scroll.isTabVisible);
    const { isTabVisible, setIsTabVisible } = useContext(AppContext);
    const [display, setDisplay] = useState("");

    // Sử dụng useEffect để theo dõi thay đổi của isTabVisible trong Redux
    useEffect(() => {
        if (isTabVisible) {
            setDisplay('flex');
        }
        else {
            setDisplay('none');
        }
    }, [isTabVisible]);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                color: '#FF6347',
                tabBarLabelStyle: { display: 'none' },
                tabBarActiveTintColor: '#FF6347',
                tabBarStyle: { height: 75, borderTopLeftRadius: 40, borderTopRightRadius: 40, display: display, backgroundColor: 'white' },
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon3 name="home" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <Mains />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Yêu thích"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart-o" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <Favourite />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Sách hot"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="whatshot" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <Hot />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Thư viện"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="book" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <Library />
                )}
            </Tab.Screen>

        </Tab.Navigator>

    )

}
const Play = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS, // Sử dụng animation slide-up
            }}
        >
            <Stack.Screen name="Home">
                {(props) => (
                    <Mains />
                )}
            </Stack.Screen>
            <Stack.Screen name="Detail">
                {(props) => (
                    <DetailScreen navigation={props.navigation} />
                )}
            </Stack.Screen>
            <Stack.Screen name="Search">
                {(props) => (
                    <SearchScreen navigation={props.navigation} />
                )}
            </Stack.Screen>
            <Stack.Screen name="Hot">
                {(props) => (
                    <ScreenWrapper>
                        <HotScreen navigation={props.navigation} />
                    </ScreenWrapper>
                )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
                {(props) => (
                    <ScreenWrapper>
                        <SignUpScreen navigation={props.navigation} />
                    </ScreenWrapper>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
const ChuaLogin = () => {
    return (
        <Stack.Navigator initialRouteName='HomeDemo' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeDemo' component={HomeDemo} />
            <Stack.Screen name="DetailDemo" component={BookDetailDemo} />
            <Stack.Screen name="SettingDemo" component={SettingScreen} />
            <Stack.Screen name="GoLogin" component={LoginUser} />
        </Stack.Navigator>
    )
}
const AppNavigator = () => {
    // const { isLogin, setIsLogin } = useContext(AppContext);
    // return (
    //     <>
    //         {isLogin == false ? <Users /> : <View style={{ flex: 1, backgroundColor: 'white' }}><Home /></View>}
    //     </>

    // )
    return(
        <ChuaLogin/>
    )
}

export default AppNavigator;

const styles = StyleSheet.create({
    iconTab: { width: 30, height: 29 }
})