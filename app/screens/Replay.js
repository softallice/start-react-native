import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback } from "react-native";
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons'

import app from "../helpers/feathers-client"

function ReplayPage(props) {
    const [recording, setRecording] = useState([])

    useEffect(() => {
        const recordInfo = props.navigation.getParam("recording")

        app.service("audio").get(recordInfo.id)
          .then(record => setRecording(record))
    })

    const playAudio = async () => {
        let fileURLArr = recording.file_url.split('.')

        fileURLArr[fileURLArr.length - 2] += '_remake'
        let newFileURL = fileURLArr.join('.')

        await FileSystem.writeAsStringAsync(newFileURL, recording.content_uri, {
            encoding: FileSystem.EncodingType.Base64
        })

        const soundObject = new Audio.Sound()

        try {
            await soundObject.loadAsync({ uri: newFileURL })
            await soundObject.playAsync()
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#fff', '#E4E5E6']} style={styles.gradient}>
                <View style={{
                    top: '15%',
                    display: 'flex',
                    width: '100%',
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableWithoutFeedback onPress={() => playAudio()}>
                        <Ionicons name="md-play-circle" size={200} color="#b71c1c" />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.recordingDataContainer}>
                    <View style={{width: '100%', textAlign: 'left', paddingBottom: 10, paddingTop: 20}}>
                        <Text style={styles.infoHeader}>Audio Information</Text>
                    </View>
                    <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.infoLabel}>Description: </Text>
                        <Text style={styles.info}>{recording.description}</Text>
                    </View>
                    <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.infoLabel}>Created At: </Text>
                        <Text style={styles.info}>{recording.createdAt}</Text>
                    </View>
                    <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.infoLabel}>File Type: </Text>
                        <Text style={styles.info}>.{recording.file_type}</Text>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
ReplayPage.navigationOptions = {
    title: "Replay Recording"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8
    },
    infoHeader: {
        paddingLeft: 15,
        fontFamily: 'Avenir-Heavy',
        fontSize: 18
    },
    infoLabel: {
        paddingLeft: 30,
        fontSize: 14,
        fontFamily: 'Avenir-Heavy'
    },
    info: {
        paddingRight: 30,
        fontSize: 14,
        fontFamily: 'Avenir'
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
    recordingDataContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: '25%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    item: {
        backgroundColor: "steelblue",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 16,
        color: "white"
    }
});


export default ReplayPage;
