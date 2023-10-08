import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';
import HotScreen from '../components/HotScreen';
import FavouriteScreen from '../components/FavouriteScreen';
import LibraryScreen from '../components/LibraryScreen';
import DetailScreen from '../components/DetailScreen';
import SearchScreen from '../components/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

const Mains = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>

    )
}

const Home = ({ scrollY }) => {
    const isTabVisibleRedux = useSelector(state => state.scroll.isTabVisible);
    const [isTabVisible, setIsTabVisible] = useState(isTabVisibleRedux);
    // Sử dụng useEffect để theo dõi thay đổi của isTabVisible trong Redux
    useEffect(() => {
        setIsTabVisible(isTabVisibleRedux);
    }, [isTabVisibleRedux]);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                color: 'red',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { height: 60, borderRadius: 20, display: isTabVisible, },
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                    // tabBarStyle: {
                    //     display: isTabVisible,
                    //     height:0, borderRadius: 20
                    // },
                }}
            >
                {() => (
                    <HomeScreen />
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
                    <Home/>
                )}
            </Stack.Screen>
            <Stack.Screen name="Detail">
                {(props) => (
                    <DetailScreen navigation={props.navigation}/>
                )}
            </Stack.Screen>
            <Stack.Screen name="Search">
                {(props) => (
                    <SearchScreen navigation={props.navigation}/>
                )}
            </Stack.Screen>
            <Stack.Screen name="Hot">
                {(props) => (
                    <ScreenWrapper>
                        <HotScreen navigation={props.navigation} />
                    </ScreenWrapper>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
const AppNavigator = () => {

    return (
        <>
            <Home />
        </>
    )
}
const mapStateToProps = (state) => ({
    isTabVisible: state.isTabVisible,
});
export default connect(mapStateToProps)(AppNavigator);

const styles = StyleSheet.create({
    iconTab: { width: 30, height: 29 }
})