import React from "react"
import { Text, View, Button, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';

import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, getGlobalState } from '../state/GlobalState';
import app from "../helpers/feathers-client"



const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isAuthenticated: false,

            newEmail: '',
            newPass: '',
            passwordConfirmation: '',

            profile: getGlobalState('profile')
        }
    }
    _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(
            key,
            value
          );
        } catch (error) {
          // Error saving data
        }
      };
    
      _retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };  

      _retrieveAll = async () => {
        try {
          const value = await AsyncStorage.getAllKeys();
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };  

      _storeClear = async () => {
        try {
          await AsyncStorage.clear();
        } catch (error) {
          // Error retrieving data
        }
      };  
    
    authenticate = (options) => {
        console.log("Authentication Attempt")
        // AsyncStorage.setItem('profile','1111')
        // console.log('test' ,AsyncStorage.getItem('profile'))
        // this._storeData('test','aaaaaaa')
        // this._retrieveData('profile')
        // this._retrieveData('auth')
        // this._retrieveAll()
        // this._retrieveData('profile')
        // this._retrieveData('token')
        // console.log(getGlobalState('profile').firstname)
        console.log(this.state.profile)
        
        return app.authenticate({ strategy: 'local', ...options })
          .then(( r ) => {
              console.log("Authentication Success")
            //   this._storeData('userInfo',JSON.stringify({
            //                         "firstName": response.user.firstname,
            //                         "lastName": response.user.lastName,
            //                         "email": response.user.email
            //                     }))
            //   this._retrieveData('userInfo')
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.accessToken })
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.user })
              this.setState({ isAuthenticated: true })
            //   app.get('token')
              this.props.navigation.navigate("Home")
          })
          .catch((err) => {
              console.log("LoginScreen: API call failed: ", err)
              this.setState({ isAuthenticated: false })
            }
          )
    }

    handleRegisterUser = () => {
        console.log("Registering new user")
        const { newEmail, newPass, passwordConfirmation } = this.state

        if (newPass !== passwordConfirmation) {
            return console.log('Your passwords do not match')
        }

        app.service('users').create({ email: newEmail, password: newPass })
          .then(() => this.authenticate({ strategy: 'local', email: newEmail, password: newPass }))
          .catch(err => console.log("Registration Failure: ", err))
    }

    render() {
        const { email, password, newEmail, newPass, passwordConfirmation } = this.state
        return (
          <KeyboardAwareScrollView>
              <ScrollView>
                <View
                  style={{
                      top: -50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: DEVICE_HEIGHT,
                      width: DEVICE_WIDTH
                  }}
                >
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        Safety Pass
                    </Text>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '100',
                        }}>
                            계정 생성은 조금 후에....
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize="none"
                        onChangeText={(password) => this.setState({ password })}
                        value={password}
                    />
                    <View style={{width: '30%'}}>
                        <Button style={{width: '100px'}} onPress={() => this.authenticate({ email: email, password: password })} title="Login" />
                    </View>
                    {/*<View style={{*/}
                        {/*marginTop: 15,*/}
                        {/*marginBottom: 15,*/}
                        {/*fontSize: 22,*/}
                        {/*fontWeight: '100',*/}
                        {/*textAlign: 'center'*/}
                    {/*}}>*/}
                        {/*<Text>OR</Text>*/}
                    {/*</View>*/}
                    {/*<Text style={{*/}
                        {/*fontSize: 16,*/}
                        {/*fontWeight: '100',*/}
                    {/*}}>*/}
                        {/*Register as a new user*/}
                    {/*</Text>*/}
                    {/*<TextInput*/}
                      {/*style={styles.input}*/}
                      {/*placeholder="Email"*/}
                      {/*autoCapitalize="none"*/}
                      {/*onChangeText={(newEmail) => this.setState({ newEmail })}*/}
                      {/*value={newEmail}*/}
                    {/*/>*/}
                    {/*<TextInput*/}
                      {/*style={styles.input}*/}
                      {/*secureTextEntry={true}*/}
                      {/*placeholder="Password"*/}
                      {/*autoCapitalize="none"*/}
                      {/*onChangeText={(newPass) => this.setState({ newPass })}*/}
                      {/*value={newPass}*/}
                    {/*/>*/}
                    {/*<TextInput*/}
                      {/*style={styles.input}*/}
                      {/*secureTextEntry={true}*/}
                      {/*placeholder="Password"*/}
                      {/*autoCapitalize="none"*/}
                      {/*onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}*/}
                      {/*value={passwordConfirmation}*/}
                    {/*/>*/}
                    {/*<View style={{width: '30%'}}>*/}
                        {/*<Button style={{width: '100px'}} onPress={this.handleRegisterUser} title="Sign Up" />*/}
                    {/*</View>*/}
                </View>
              </ScrollView>
          </KeyboardAwareScrollView>
        )
    }
}

LoginScreen.navigationOptions = {
  title: "로그인",
  headerShown: false,
}

export default LoginScreen

const styles = StyleSheet.create({
    input: {
        margin: 8,
        height: 40,
        width: 230,
        borderColor: "steelblue",
        borderWidth: 1,
        paddingLeft: 15
    },
    submitButton: {
        padding: 10,
        margin: 15,
        height: 40
    },
    submitButtonText: {
        color: "white"
    }
})
