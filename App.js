import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";


import Loading from "./app/screens/load/Loading";
import Main from "./app/Index";
import WebViewBridge from "./app/WebViewBridge";

export default class APP extends React.Component{
  constructor() {
    super();
    this.state = {
      showRealApp: false,
      isNavigation: false,
      isLoading : true
    };
  }

  componentDidMount= async() => {  
    // 1,000가 1초
    setTimeout(() => {this.setState({isLoading: false})},3000);
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity onPress={()=>this.setState({ isNavigation: true })}>
          <Text
            style={{
              color: "#347AF0",
              marginTop: 50,
              textAlign: "right",
              marginRight: "7%",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <Image
          source={item.image}
          style={{
            width: "90%",
            height: 240,
            alignSelf: "center",
            marginTop: 30,
          }}
        />
        <View
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 10,
            marginVertical: 40,
            paddingBottom: 300,
            paddingTop: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.nextBtn}>
        <Text
          style={{ color: "#347AF0", textAlign: "center", fontWeight: "bold" }}
        >
          Next Step
        </Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.textDone}>Let's Get Started</Text>
      </View>
    );
  };
  _onDone = () => {
    this.setState({ isNavigation: true });
  };
  onslideCahnge = (index, lastIndex) => {
    console.log(index, lastIndex);
  };

  render() {
    if(this.state.isLoading){
      return <Loading/> 
    } else {
      if (this.state.showRealApp) {
        return <App />;
      } else {
        return this.state.isNavigation === true ? (
          <Main />
          // <WebViewBridge/>
        ) : (
          <AppIntroSlider
            renderItem={this._renderItem}
            data={slides}
            onDone={this._onDone}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            dotStyle={{ backgroundColor: "#F2F2F2", marginTop: -710 }}
            activeDotStyle={{ backgroundColor: "#347AF0", marginTop: -710 }}
            onSlideChange={(index, lastIndex) =>
              this.onslideCahnge(index, lastIndex)
            }
            backgroundColor="black"
          />
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center",
    marginTop: 16,
    width: "80%",
    alignSelf: "center",
  },
  slide: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  buttonCircle: {
    borderColor: "#347AF0",
    borderWidth: 1,
    padding: "5%",
    borderRadius: 50,
    width: "78%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#347AF0",
    marginRight: "40%",
    // marginTop:-50
  },
  textDone: {
    color: "white",
  },
  nextBtn: {
    backgroundColor: "white",
    borderColor: "#347AF0",
    borderWidth: 1,
    padding: "5%",
    paddingLeft: "20%",
    paddingRight: "20%",
    borderRadius: 50,
    marginRight: "22%",
  },
});

const slides = [
  {
    key: "s1",
    text: "블록체인 기반의 백신 접종 기록 관리를 쉽게 하실수 있습니다!",
    title: "Welcome to PASS APP",
    titleStyle: styles.title,
    textStyle: styles.text,
    image: require("./app/assets/images/desktop.png"),
  },
  {
    key: "s2",
    title: "안전한 개인정보의 보관",
    titleStyle: styles.title,
    text: "개인 정보를 안전하게 보관 및 관리 가능!",
    image: require("./app/assets/images/idea.png"),
  },
  {
    key: "s3",
    title: "QR 코드 기반의 이력 확인!",
    titleStyle: styles.title,
    text: "QR 코드를 기반으로 백신 이력 인증",
    image: require("./app/assets/images/social.png"),
    backgroundColor: "#22bcb5",
  },

  {
    key: "s4",
    title: "블록체인으로 신뢰성 향상",
    titleStyle: styles.title,
    text: " 신뢰 기반의 블록체인 기록으로 안전하게 관리",
    image: require("./app/assets/images/mobile.png"),
    backgroundColor: "#febe29",
  },
];



  
