import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, getGlobalState } from '../state/GlobalState';
import app from "../helpers/feathers-client"

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      isAuthenticated: false,

      passwordConfirmation: '',

      profile: getGlobalState('profile'),
      passwordSecurity: true,
    }
  }

  handleRegisterUser = (firstname, lastname, email, password, passwordConfirmation) => {
    console.log("Registering new user")
    app.service('users').create({
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": password
    })
      .then(
        () => this.props.navigation.navigate("PinCode")
        ) 
      .catch(err => console.log("Registration Failure: ", err))

}


  render() {
    const { email, password, firstname, lastname, passwordConfirmation } = this.state
    return (
      <View style={styles.container}>
        <View style={{height: 240}}>
          <Image
            source={require("../assets/images/login.png")}
            style={{
              width: "80%",
              height: 220,
              alignSelf: "center",
              marginTop: 100,
            }}
          />
        </View>
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
                placeholder="First Name"
                placeholderTextColor="#3D4C63"
                onChangeText={(firstname) => this.setState({ firstname })}
                value={firstname}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#3D4C63"
                onChangeText={(lastname) => this.setState({ lastname })}
                value={lastname}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#3D4C63"
                onChangeText={(email) => this.setState({ email })}
                value={email}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#3D4C63"
                secureTextEntry={this.state.passwordSecurity}
                onChangeText={(password) => this.setState({ password })}
                value={password}
                autoCapitalize="none"
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
            <View style={styles.bottomView}>
              <TouchableOpacity
                style={styles.walletBtn}
                onPress={this.handleRegisterUser}
                // onPress={() => this.props.navigation.navigate("pincode")}
                // onPress={() => this.props.navigation.navigate("Login")}
                onPress={() => this.handleRegisterUser( firstname,  lastname,  email,  password)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  회원가입
                </Text>
              </TouchableOpacity>
              <View style={styles.signupView}>
                <Text style={{ color: "#485068" }}>
                  이미 회원이신가요 ?
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: "2%" }}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text style={{ color: "#347AF0", fontWeight: "700" }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 25,
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
    marginTop: 20,
  },
  walletBtn: {
    backgroundColor: "#347AF0",
    textAlign: "center",
    width: "70%",
    alignSelf: "center",
    padding: 12,
    borderRadius: 50,
  },
  signupView: {
    flexDirection: "row",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingBottom: 30,
  },
});
