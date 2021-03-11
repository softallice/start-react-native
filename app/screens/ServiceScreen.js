import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Asset } from 'expo-asset'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

class Icon {
  constructor(module, width, height) {
    this.module = module
    this.width = width
    this.height = height
    Asset.fromModule(module).downloadAsync()
  }
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const RecordOption = {
  android: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    outputFormat:Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}
export default class ServiceScreen extends React.Component {
  constructor(props) {
    super(props)
    this.recording = null
    this.sound = null
    this.state = {
      uri: null,
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    }
    this.recordingSettings = JSON.parse(JSON.stringify(RecordOption))
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'Avenir': require('../assets/fonts/Avenir-Book.ttf'),
        'Avenir-Heavy': require('../assets/fonts/Avenir-Roman.ttf'),
        'Avenir-Light': require('../assets/fonts/Avenir-Light.ttf'),
      })
      this.setState({ fontLoaded: true })
    })()
    this._askForPermissions()
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    })
  }

  _updateScreenForSoundStatus = status => {
    const { durationMillis, positionMillis, shouldPlay, isPlaying, rate, isMuted, volume, shouldCorrectPitch, error } = status

    if (status.isLoaded) {
      this.setState({
        soundDuration: durationMillis,
        soundPosition: positionMillis,
        shouldPlay: shouldPlay,
        isPlaying: isPlaying,
        rate: rate,
        muted: isMuted,
        volume: volume,
        shouldCorrectPitch: shouldCorrectPitch,
        isPlaybackAllowed: true,
      })
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      })
      if (error) {
        console.log(`FATAL PLAYER ERROR: ${error}`)
      }
    }
  }

  _updateScreenForRecordingStatus = status => {
    const { durationMillis, isDoneRecording, canRecord, isRecording } = status
    const { isLoading } = this.state

    if(durationMillis > 60000){
      this._stopRecordingAndEnablePlayback()
    }
    else if (canRecord) {
      this.setState({
        isRecording: isRecording,
        recordingDuration: durationMillis,
      })
    } else if (isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: durationMillis,
      })
      if (!isLoading) {
        this._stopRecordingAndEnablePlayback()
      }
    }
  }

  async _stopPlaybackAndBeginRecording() {
    this.setState({ isLoading: true })

    if (this.sound !== null) {
      await this.sound.unloadAsync()
      this.sound.setOnPlaybackStatusUpdate(null)
      this.sound = null
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    })

    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null)
      this.recording = null
    }

    const recording = new Audio.Recording()
    await recording.prepareToRecordAsync(this.recordingSettings)
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus)

    this.recording = recording
    await this.recording.startAsync() // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({ isLoading: false })
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({ isLoading: true })

    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }

    const info = await FileSystem.getInfoAsync(this.recording.getURI())

    const contentURI = await FileSystem.readAsStringAsync(info.uri, { encoding: FileSystem.EncodingType.Base64 })

    this.setState({ uri: info.uri })

    this.props.navigation.navigate('Result', { uri_info: info.uri, length: this._getMMSSFromMillis(this.state.recordingDuration), contentURI })

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    })

    const { sound } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    )

    this.sound = sound
    this.setState({ isLoading: false })
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback()
    } else {
      this._stopPlaybackAndBeginRecording()
    }
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number => {
      const string = number.toString()
      if (number < 10) {
        return '0' + string
      }
      return string
    }
    return padWithZero(minutes) + ':' + padWithZero(seconds)
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`
    }
    return `${this._getMMSSFromMillis(0)}`
  }

  render() {
    const { fontLoaded, haveRecordingPermissions, isLoading, isRecording } = this.state
    const { container, emptyContainer, noPermissionsText, recordButtonContainer, infoContainer, recordingDataContainer, gradient, microphone } = styles

    if(!fontLoaded) {
        return (
            <View style={emptyContainer} />
        )
    }

    if (!haveRecordingPermissions){
        return (
            <View style={container}>
                <View />
                <Text style={[noPermissionsText, { fontFamily: 'Avenir-Light' }]}>
                  You must enable audio recording permissions in order to use this app.
                </Text>
                <View />
            </View>
        )
    }

    return (
      <View style={container}>
        <LinearGradient colors={['#fff', '#E4E5E6']} style={gradient}>
            <View style={infoContainer}>
            <Text style={{ fontSize: 22, fontFamily: "Avenir-Heavy"}}>
              {/* { isRecording ? "End Recording" : "Begin Recording" } */}
              백신 접종, 방문증, 사원증 ....
            </Text>
          </View>
          {/* <View style={recordButtonContainer}>
            <TouchableHighlight onPress={this._onRecordPressed} disabled={isLoading} style={microphone}>
              <Ionicons color="#fff" name={isRecording ? 'ios-mic-off' : 'ios-mic'} size={120} style={{backgroundColor: 'transparent'}}/>
            </TouchableHighlight>
          </View> */}
          {/* <View style={recordingDataContainer}>
            <Text style={{fontSize: 44, fontFamily: "Avenir-Light", paddingTop: 10}}>{this._getRecordingTimestamp()}</Text>
          </View> */}
        </LinearGradient>
      </View>
    )
  }
}
ServiceScreen.navigationOptions = {
  title: "서비스"
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
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
  noPermissionsText: {
    textAlign: 'center',
  },
  recordButtonContainer: {
    top: '20%',
    backgroundColor: 'transparent'
  },
  recordingDataContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: '30%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  infoContainer: {
    top: '10%'
  },
  liveText: {
    color: '#FF0000',
  },
  image: {
    backgroundColor: '#FFFFFF'
  },
})
