import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  onLoadEnd () {
    this.webview.postMessage("sendmessage");
  }
  onMessage (event) {
    alert(event.nativeEvent.data);
  }

  render() {
    return <WebView 
              ref={webview => (this.webview = webview)}
              source={{ uri: 'http://172.27.42.206:8085/login' }} 
              style={{ marginTop: 20 }} 
              onLoadEnd={() => this.onLoadEnd()}
              onMessage={this.onMessage}
              cacheEnabled={false}
              originWhitelist={['*']}
              javaScriptEnabled={true}
            />;
  }
}

App.navigationOptions = {
  title: "로그인",
  headerShown: false,
}
