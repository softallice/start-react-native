import React from "react";
import { View, Text } from "react-native";

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{ fontSize: 30, marginBottom: 30 }}>
                    Hang on a second...
                </Text>
            </View>
        );
    }
}

export default LoadingScreen;
