import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableHighlight, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { formatDistance } from 'date-fns'
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'

import app from "../helpers/feathers-client"

function HomeScreen( props) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Card>
                    <Card.Title>대표 인증 QR</Card.Title>
                    <Card.Divider />
                    <Card.Image style={{width: 150}} source={require('../assets/images/qrsample.png')} />
                    <Text style={{marginBottom: 10}}>
                    홍길동
                    </Text>
                </Card>
            </View>
            <ScrollView>
                  <View style={{display: 'flex', top: '10%'}}>
                      <Text style={{ fontSize: 16, textAlign: 'center'}}>대표 카드 및 Qr코드 , 서비스 바로가기 추가!</Text>
                  </View>
                  <Card>
                    <Card.Title>스크롤 뷰</Card.Title>
                    <Card.Divider />
                    <Card.Image source={require('../assets/images/addresscard.png')}>
                        
                    </Card.Image>
                    <Text style={{marginBottom: 10}}>
                    qr 코드 이미지 생성 및 DID, 사용자 이름 등 표시하는 부분
                    </Text>
                </Card>
                  <Card>
                    <Card.Title>스크롤 뷰</Card.Title>
                    <Card.Divider />
                    <Card.Image source={require('../assets/images/addresscard.png')}>
                        
                    </Card.Image>
                    <Text style={{marginBottom: 10}}>
                    qr 코드 이미지 생성 및 DID, 사용자 이름 등 표시하는 부분
                    </Text>
                </Card>
                  <Card>
                    <Card.Title>스크롤 뷰</Card.Title>
                    <Card.Divider />
                    <Card.Image source={require('../assets/images/addresscard.png')}>
                        
                    </Card.Image>
                    <Text style={{marginBottom: 10}}>
                    qr 코드 이미지 생성 및 DID, 사용자 이름 등 표시하는 부분
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}
HomeScreen.navigationOptions = {
    title: "Safety Pass",
    headerRight: () => (
        <Button
            onPress={() => alert('This is a button!')}//props.navigation.navigate("QrScann")}
            icon={
                <Icon
                    name="qr-code-scanner"
                    size={20}
                    color="black"
                />
            }
            type="clear"
        />        
    ),
    headerRightContainerStyle: {
        paddingRight: 10
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: 'rgb(245,245,245)',
        borderBottomColor: 'rgb(230,230,230)',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    itemTop: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5
    },
    itemBottom: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    title: {
        fontSize: 16,
        color: "white"
    }
});

export default HomeScreen;
