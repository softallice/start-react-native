import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import Loading from "./screens/LoadingScreen";
import Login from "./screens/LoginScreen";
import SignUp from "./screens/SignUpScreen"
import Home from "./screens/HomeScreen";
import Covid from "./screens/CovidScreen";
import Service from "./screens/ServiceScreen";
import Setting from "./screens/SettingScreen";
import QrScann from "./screens/QrScannScreen"
import PinCode from "./screens/pincode/PinCodeScreen"
import ConfirmPin from "./screens/pincode/ConfirnmPinScreen"
import BioAuth from "./screens/bioauth/BioAuthScreen"
import { disableExpoCliLogging } from "expo/build/logs/Logs";



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
        case "QR":
            iconName = "qr-code-sharp";
            break;
        case "Setting":
            iconName = "ellipsis-horizontal";
            break;
    }

    return <Ionicons name={iconName} size={24} color={tintColor} />;
};

//헤더 제어 
const ServiceStack = createStackNavigator({
    Service: Service, //첫번째
    QR: QrScann //두번째
});

const HomeStack = createStackNavigator({
    Home: Home,
    QR: QrScann //두번째
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

// const PinCodeStack = createStackNavigator({
    
    
// });



const MainStack = createBottomTabNavigator(
    {
        Home: HomeStack,
        Service: ServiceStack,
        Chat: CovidStack,
        QR: QrScannStack,
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
                borderTopColor: 'gray'
            }
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Login: Login,
        SignUp: SignUp,
        PinCode: PinCode,
        ConfirmPin: ConfirmPin
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
