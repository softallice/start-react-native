import React from "react";
import { Audio } from "expo-av";
import { Text, View, Alert, TextInput, ScrollView, StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import app from "../helpers/feathers-client"
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Font from "expo-font";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_url: this.props.navigation.getParam("uri_info", "nothing sent"),
      content_uri: this.props.navigation.getParam("contentURI"),
      length: this.props.navigation.getParam("length"),
      description: "",
    };
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

  async _stopRecordingAndEnablePlayback() {
    const { file_url } = this.state
    const soundObject = new Audio.Sound()

    try {
      await soundObject.loadAsync({ uri: file_url });
      await soundObject.playAsync();
    } catch (error) {
      console.warn(error);
    }
  }

  sendAudio = () => {
    const { file_url, description, content_uri, length } = this.state
    const file_arr = file_url.split(".")
    const file_type = file_arr[file_arr.length - 1]

    app.service("audio").create({ file_url, description, content_uri, file_type, length })

    this.props.navigation.navigate('History')
  };

  sendPressed = () => {
    Alert.alert(
      "Send Recording",
      "Are you sure you want to send this audio recording? ",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Send: Cancel Pressed");
          },
          style: "cancel"
        },
        {
          text: "Send",
          onPress: () => {
            console.log("Send: Send Pressed");
            this.sendAudio();
          }
        }
      ],
      { cancelable: false }
    );
  };

  _onRecordPressed = () => {
    this._stopRecordingAndEnablePlayback();
  };

  render() {
    const { description } = this.state
    const { navigation } = this.props

    return (
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.container}>
            <LinearGradient colors={['#fff', '#E4E5E6']} style={styles.gradient}>
              <View style={styles.infoContainer}>
                <Text style={{ fontSize: 22, fontFamily: "Avenir-Heavy"}}>Playback</Text>
              </View>
              <View style={styles.recordButtonContainer}>
                <TouchableHighlight style={styles.microphone} onPress={this._onRecordPressed}>
                  <Ionicons color="#fff" name='ios-play' size={120} style={{backgroundColor: 'transparent', marginLeft: 13, marginTop: 5}}/>
                </TouchableHighlight>
              </View>
              <View style={styles.recordingDataContainer}>
                <TextInput
                  style={styles.description}
                  underlineColorAndroid="transparent"
                  placeholder="Add a Title..."
                  placeholderTextColor="#424242"
                  onChangeText={(description) => this.setState({ description })}
                  value={description}
                />
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.deleteButton} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#ffffff', fontFamily: 'Avenir-Heavy', fontSize: 16}}> DELETE </Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.submitButton} onPress={this.sendPressed}>
                    <Text style={{color: '#ffffff', fontFamily: 'Avenir-Heavy', fontSize: 16}}> SUBMIT </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

ResultPage.navigationOptions = {
  title: "Review Audio"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  infoContainer: {
    top: '10%'
  },
  description: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16,
    width: '60%',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    borderRadius: 3,
    padding: 5,
    fontWeight: '700'
  },
  deleteButton: {
    alignItems: 'center',
    width: '40%',
    margin: 10,
    borderRadius: 30,
    backgroundColor: '#b71c1c',
    padding: 10
  },
  recordButtonContainer: {
    top: '20%',
    backgroundColor: 'transparent'
  },
  submitButton: {
    alignItems: 'center',
    width: '40%',
    margin: 10,
    borderRadius: 30,
    backgroundColor: '#3f51b5',
    padding: 10
  },
  microphone: {
    backgroundColor: '#b71c1c',
    width: 200,
    height: 200,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    height: '35%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
})

export default ResultPage;
