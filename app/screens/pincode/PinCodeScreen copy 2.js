import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PinView from 'react-native-pin-view'

export default class PinCodeScreen extends React.Component {

    state = {
        pin: '1234'
    }

    onComplete = (inputtedPin,clear) => {
        if(inputtedPin == this.state.pin){
            alert('Pin is correct');
            clear();
        }else{
            clear();
        }
    }

    render() {
        console.log(this.state.pin);
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'#87cefa' }}>
                <PinView
                    pinLength={this.state.pin.length}
                    onComplete={this.onComplete}
                    inputViewStyle={{backgroundColor:"#000"}}
                    inputBgOpacity={0.3}
                />
            </View>
        );
    }
}