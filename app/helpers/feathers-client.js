import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
const auth = require('@feathersjs/authentication-client')
import AsyncStorage from '@react-native-community/async-storage'

const socket = io('http://172.27.42.206:3030', { // Change to API_BASE_URL
  transports: ['websocket'],
  forceNew: true
})

const app = feathers();

app.configure(socketio(socket))
app.configure(auth({
    storage: AsyncStorage,
    storageKey: 'auth'
  }))

// app.service("users").create({ email: 'aaa@naver.com', password: '123456789' })

export { app as default }
