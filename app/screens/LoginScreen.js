import React from "react"
import { Text, View, Button, StyleSheet, TextInput, ScrollView, Dimensions, TouchableOpacity , Image} from "react-native"
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from "@expo/vector-icons";
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

            profile: getGlobalState('profile'),
            userinfo: getGlobalState('userinfo'),
            passwordSecurity: true,
        }
    }   

  componentDidMount = async () => {
    console.log(this.state.userinfo)
    if (this.state.userinfo) {
      this.authenticate(this.state.userinfo)
    } else {
      console.log("로그인 필수")
    }
  }
    
    authenticate = (options) => {
      console.log("Authentication Attempt")
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
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.USERINFO, state: options })
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
        const { email, password } = this.state
        return (
          <View style={styles.container}>
            <Text style={styles.loginTitle}>Welcome!</Text>
            <Image
              source={require("../assets/images/welcome.png")}
              style={{
                width: "95%",
                height: 200,
                alignSelf: "center",
                marginTop: 100,
              }}
            />
            <ScrollView>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                }}
              >
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(email) => this.setState({ email })}
                    value={email}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="#3D4C63"
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#3D4C63"
                    secureTextEntry={this.state.passwordSecurity}
                    autoCapitalize="none"
                    onChangeText={(password) => this.setState({ password })}
                    value={password}
                  />
                  {this.state.passwordSecurity === true ? (
                    <Feather
                      name="eye"
                      size={24}
                      color="black"
                      onPress={() => this.setState({ passwordSecurity: false })}
                    />
                  ) : (
                    <Feather
                      name="eye-off"
                      size={24}
                      color="black"
                      onPress={() => this.setState({ passwordSecurity: true })}
                    />
                  )}
                </View>
                {/* <Text style={styles.forgotLink} onPress={() => this.props.navigation.navigate("forgatPassword")} >Forgot your Password?</Text> */}
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.walletBtn}
                    // onPress={() => this.props.navigation.navigate("verifyPincode")} 핀번호 체크 후 로그인 처리
                    onPress={() => this.authenticate({ email: email, password: password })}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Login
                </Text>
                  </TouchableOpacity>
                  <View style={styles.signupView}>
                    <Text style={{ color: "#485068" }}>회원 가입 </Text>
                    <TouchableOpacity
                      style={{ marginLeft: "2%" }}
                      onPress={() => this.props.navigation.navigate("PinCode")}
                      // onPress={() => this.props.navigation.navigate("SignUp")}
                    >
                      <Text style={{ color: "#347AF0", fontWeight: "700" }}>
                        Sign Up
                  </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )
    }
}

LoginScreen.navigationOptions = {
  title: "로그인",
  headerShown: false,
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  loginTitle: {
    top: 70,
    fontWeight: "bold",
    fontSize: 20,
    color: "#0D1F3C",
    textAlign: "center",
  },
  inputView: {
    width: "89%",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD2D8",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 40,
  }, 
  input: {
    width: "90%",
    fontSize: 20,
    padding: "3%",
  },
  forgotLink: {
    width: "89%",
    alignSelf: "center",
    textAlign: "right",
    marginTop: 6,
    color: "#347AF0",
  },
  bottomView: {
    marginTop: 110,
  },
  walletBtn: {
    backgroundColor: "#347AF0",
    textAlign: "center",
    width: "70%",
    alignSelf: "center",
    padding: 13,
    borderRadius: 50,
  },
  signupView: {
    flexDirection: "row",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingBottom: 28,
  },
});
