import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class PincodeScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstValue: false,
      secondValue: false,
      thirdValue: false,
      fourthValue: false,
      firstSection: [1, 2, 3],
      secondSection: [4, 5, 6],
      thirdSection: [7, 8, 9],
      fourthSection: [".", 0, "x"],
      pinCodeValue: "",
    };
  }
  picnCode1 = (i) => {
    var num = i + 1;
    // alert(num);
    var n = num.toString();
    this.setState({ pinCodeValue: this.state.pinCodeValue + n });
    if (this.state.pinCodeValue.length === 1) {
      this.setState({ firstValue: true });
    } else if (this.state.pinCodeValue.length === 2) {
      this.setState({ secondValue: true });
    } else if (this.state.pinCodeValue.length === 3) {
      this.setState({ thirdValue: true });
    } else if (this.state.pinCodeValue.length === 4) {
      this.setState({ fourthValue: true });
      this.props.navigation.navigate("ConfirmPin");
    }
  };
  render() {
    console.log(this.state.pinCodeValue);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Enhance the security of your account by creating a PIN code
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 150 }}>
          <Text
            style={
              this.state.firstValue === true
                ? styles.pinCodeText1
                : styles.pinCodeText
            }
          ></Text>
          <Text
            style={
              this.state.secondValue === true
                ? styles.pinCodeText1
                : styles.pinCodeText
            }
          ></Text>
          <Text
            style={
              this.state.thirdValue === true
                ? styles.pinCodeText1
                : styles.pinCodeText
            }
          ></Text>
          <Text
            style={
              this.state.fourthValue === true
                ? styles.pinCodeText1
                : styles.pinCodeText
            }
          ></Text>
        </View>
        <View style={{ marginTop: 200 }}>
          <View style={styles.keyBoardView}>
            {this.state.firstSection.map((v, i) => {
              return (
                <TouchableOpacity
                  style={styles.keyBoarText}
                  onPress={() => this.picnCode1(i)}
                >
                  <Text style={styles.numberText}>{v}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.keyBoardView}>
            {this.state.secondSection.map((v, i) => {
              return (
                <TouchableOpacity
                  style={styles.keyBoarText}
                  onPress={() => this.picnCode1(i)}
                >
                  <Text style={styles.numberText}>{v}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.keyBoardView}>
            {this.state.thirdSection.map((v, i) => {
              return (
                <TouchableOpacity
                  style={styles.keyBoarText}
                  onPress={() => this.picnCode1(i)}
                >
                  <Text style={styles.numberText}>{v}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.keyBoardView}>
            {this.state.fourthSection.map((v, i) => {
              return (
                <TouchableOpacity
                  style={styles.keyBoarText}
                  onPress={() => this.picnCode1(i)}
                >
                  <Text style={styles.numberText}>{v}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  header: {
    flexDirection: "row",
    top: 50,
    width: "85%",
    alignSelf: "center",
  },
  headerText: {
    textAlign: "center",
    marginTop: 30,
    width: "100%",
    alignSelf: "center",
    color: "#485068",
    marginLeft: "2%",
  },
  keyBoardView: {
    flexDirection: "row",
    // marginTop:200,
    width: "100%",
  },
  keyBoarText: {
    width: "100%",
    alignSelf: "center",
    padding: "15%",
    // backgroundColor:"green"
  },
  numberText: {
    textAlign: "center",
    fontSize: 25,
    color: "#003282",
  },
  pinCodeText: {
    width: "4%",
    backgroundColor: "#9EA5B1",
    margin: 10,
    borderRadius: 50,
    height: 15,
    padding: 10,
  },
  pinCodeText1: {
    width: "4%",
    backgroundColor: "#75BF72",
    margin: 10,
    borderRadius: 50,
    height: 15,
    padding: 10,
  },
});
