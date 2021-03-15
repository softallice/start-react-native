import React, { Component } from "react";
import { Alert, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity as TouchableHighlight, Image , ScrollView } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'

import * as Font from "expo-font";
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, getGlobalState } from '../state/GlobalState';
import app from "../helpers/feathers-client"



const list = [
    {
      title: '백업하기',
      icon: 'backup'
    },
    {
      title: '인증 비밀번호 재설정',
      icon: 'lock-open'
    },
    {
      title: '알림설정',
      icon: 'messenger-outline'
    },
    {
      title: '앱잠금 설정',
      icon: 'lock'
    },
  ]

//   const [profile] = getGlobalState('profile');

export default class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: getGlobalState('profile')
        }
    }

    componentDidMount() {
        (async () => {
            await Font.loadAsync({
                'Avenir': require('../assets/fonts/Avenir-Book.ttf'),
                'Avenir-Heavy': require('../assets/fonts/Avenir-Roman.ttf'),
                'Avenir-Light': require('../assets/fonts/Avenir-Light.ttf'),
            })
        })()
    }
   
    
    logOut = () => {
        this.setState({ isLoading: false });
        console.log("profile--> logout")
        console.log(this.state.profile)
        return Alert.alert(
            "로그 아웃",
            "정말 로그아웃 하시겠습니까?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: () => {
                        app.logout()
                          .then(() => this.props.navigation.navigate("Login"))
                          dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
                    }
                }
            ],
            { cancelable: false }
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#fff', '#E4E5E6']} style={styles.gradient}>
                    <View>
                        <Card>
                            <Card.Title>{this.state.profile.firstname}</Card.Title>
                            <Card.Divider />
                            <Card.Image source={require('../assets/images/addresscard.png')}>
                                
                            </Card.Image>
                            <Text style={{marginBottom: 10}}>
                            {/* DID :{this.state.profile.did.did1} */}
                            DID :
                            </Text>
                            <Text style={{marginBottom: 10}}>
                            qr 코드 이미지 생성 및 DID, 사용자 이름 등 표시하는 부분
                            </Text>
                        </Card>
                        <Divider style={{height: 10 }} />
                        <View>
                        {
                            list.map((item, i) => (
                            <ListItem key={i} bottomDivider>
                                <Icon name={item.icon} />
                                <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                            ))
                        }
                        </View>
                    </View>
                    
                    <View style={styles.recordingDataContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableHighlight style={styles.deleteButton} onPress={() => this.logOut()}>
                                {/* <Text style={{color: '#ffffff', fontFamily: 'Avenir-Heavy', fontSize: 16}}> LOG OUT </Text> */}
                                <Text style={{ color: '#ffffff', fontSize: 16 }}> LOG OUT </Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}


setting.navigationOptions = {
    title: "더보기"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    recordingDataContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: '12%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    deleteButton: {
        alignItems: 'center',
        width: '40%',
        margin: 10,
        borderRadius: 30,
        backgroundColor: '#b71c1c',
        padding: 10
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
