import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
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
import BookDetail from '../tranthuc/BookDetail';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Hello" component={ManChao} />
        </Stack.Navigator>
    )
}

const Mains = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='Detail' component={BookDetail} />
            <Stack.Screen name='Play' component={PlayScreen} />
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
    const {isTabVisible, setIsTabVisible} = useContext(AppContext);
    const [display, setDisplay] = useState("");
     
    // Sử dụng useEffect để theo dõi thay đổi của isTabVisible trong Redux
    useEffect(() => {
        if(isTabVisible){
            setDisplay('flex');
        }
        else{
            setDisplay('none');
        }
    }, [isTabVisible]);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                color: 'red',
                tabBarLabelStyle: { display:'none' },
                tabBarActiveTintColor:'#D45555',
                tabBarStyle: { height: 75, borderTopLeftRadius:40,borderTopRightRadius:40,display:display },
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={30} />
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
                        <Icon name="heart" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <FavouriteScreen />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Sách hot"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="fire" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <HotScreen />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Thư viện"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bookmark" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <LibraryScreen />
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
const AppNavigator = () => {
    const { isLogin, setIsLogin } = useContext(AppContext);
    return (
        <>
            {isLogin == false ? <Users /> : <Home />}
        </>
    )
}

export default AppNavigator;

const styles = StyleSheet.create({
    iconTab: { width: 30, height: 29 }
})