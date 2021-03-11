import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableHighlight, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { formatDistance } from 'date-fns'

import app from "../helpers/feathers-client"

function HomeScreen(props) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        app.service("audio").find({ query: { $select: ['id', 'file_url', 'description', 'createdAt', 'length'] }})
          .then(audio => setHistory(audio.data))

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                { history.length == 0 ?
                  <View style={{display: 'flex', top: '10%'}}>
                      <Text style={{fontFamily: 'Avenir-Heavy', fontSize: 16, textAlign: 'center'}}>대표 카드 및 Qr코드 , 서비스 바로가기 추가!</Text>
                  </View>
                  :
                  history.map(recording => (
                        <TouchableHighlight onPress={() => props.navigation.navigate('Replay', { recording })}>
                            <View style={styles.itemContainer}>
                                <View style={styles.itemTop}>
                                    <Text style={{fontSize: 22, fontFamily: "Avenir-Heavy", marginLeft: 15}}>{recording.description}</Text>
                                    <Text style={{fontSize: 22, fontFamily: "Avenir-Light", marginRight: 15}}>{recording.length}</Text>
                                </View>
                                <View style={styles.itemBottom}>
                                    <Text style={{fontSize: 14, fontFamily: "Avenir", marginLeft: 15}}>{formatDistance(new Date(recording.createdAt), new Date())} ago</Text>
                                    <Ionicons name="ios-arrow-dropright" size={18} color="#64b5f6" style={{marginRight: 15}} />
                                </View>
                            </View>
                        </TouchableHighlight>
                      ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}
HomeScreen.navigationOptions = {
    title: "Honey PASS"
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
