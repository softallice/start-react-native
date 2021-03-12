import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import Loading from "./screens/LoadingScreen";
import Login from "./screens/LoginScreen";
import Home from "./screens/HomeScreen";
import Covid from "./screens/CovidScreen";
import Service from "./screens/ServiceScreen";
import Setting from "./screens/SettingScreen";
import QrScann from "./screens/QrScannScreen"
import ResultPage from "./screens/ResultPage";


// import IntroPage from "./app/screens/intro/IntroScreen"

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    switch (routeName) {
        case "Home":
            iconName = "md-home";
            break;
        case "Service":
            iconName = "apps-sharp";
            break;
        case "Chat":
            iconName = "ios-chatbubbles-sharp";
            break;
        case "Setting":
            iconName = "ellipsis-horizontal";
            break;
    }

    return <Ionicons name={iconName} size={25} color={tintColor} />;
};

//헤더 제어 
const ServiceStack = createStackNavigator({
    Service: Service, //첫번째
    Result: ResultPage //두번째
});

const HomeStack = createStackNavigator({
    Home: Home
});

const ChatStack = createStackNavigator({
    Chat: Setting
});

const QrScannStack = createStackNavigator({
    QrScann: QrScann
});

const SettingStack = createStackNavigator({
    Setting: Setting
});

const CovidStack = createStackNavigator({
    Covid: Covid
});



const MainStack = createBottomTabNavigator(
    {
        Home: HomeStack,
        Service: ServiceStack,
        Chat: CovidStack,
        Setting: SettingStack
    },
    {
        initialRouteName: "Service",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor)
        }),
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            style: {
                borderTopColor: 'transparent'
            }
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Login: Login
    },
    
)

const RootStack = createSwitchNavigator(
    {
        Load: Loading,
        Login: AuthStack,
        Main: MainStack
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(RootStack);
