import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableHighlight, ScrollView } from "react-native";

import app from "../helpers/feathers-client"

function CovidScreen(props) {
    const [Vaccination, setVaccination] = useState([])

    useEffect(() => {
        app.service("vaccinations").find({ query: { $select: ['id', 'did', 'vaccName', 'vaccSeq', 'vaccDate', 'vaccCom', 'vaccLoc', 'vaccineName', 'vaccineLot', 'manufacturer', 'certNo' ] }})
          .then(vaccinations => setVaccination(vaccinations.data))

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                { Vaccination.length == 0 ?
                  <View style={{display: 'flex', top: '10%'}}>
                      <Text style={{ fontSize: 16, textAlign: 'center'}}>백신 접종 이력에 대한 리스트</Text>
                  </View>
                  :
                  Vaccination.map(vaccin => (
                        <TouchableHighlight > 
                            <View style={styles.itemContainer}>
                                <View style={styles.itemTop}>
                                    {/* <Text style={{fontSize: 18, marginLeft: 15}}>{vaccin.id}</Text> */}
                                    <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.vaccName}</Text>
                                    <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.vaccSeq}</Text>
                                    <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.vaccDate}</Text>
                                    {/* <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.vaccCom}</Text> */}
                                    <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.vaccineName}</Text>
                                    <Text style={{fontSize: 18, marginRight: 15}}>{vaccin.manufacturer}</Text>
                                </View>
                                <View style={styles.itemBottom}>
                                    {/* <Text style={{fontSize: 14, fontFamily: "Avenir", marginLeft: 15}}>{formatDistance(new Date(vaccin.createdAt), new Date())} ago</Text> */}
                                    {/* <Ionicons name="ios-arrow-dropright" size={18} color="#64b5f6" style={{marginRight: 15}} /> */}
                                </View>
                            </View>
                        </TouchableHighlight>
                      ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}
CovidScreen.navigationOptions = {
    title: "백신 접종"
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

export default CovidScreen;
