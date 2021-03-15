import { createStore } from 'react-hooks-global-state';
import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store'; //속도로 인해 주요 정보만 저장

export const GLOBAL_STATE_ACTIONS = {
    ERROR: 'error',
    SUCCESS: 'success',
    TOKEN: 'TOKEN',
    PINCODE: 'PINCODE',
    PROFILE: 'PROFILE',
    LOGOUT: 'LOGOUT',
    USERINFO: 'USERINFO',
    ACHIVEMEN_SELECTED: 'ACHIVEMEN_SELECTED',
}

const initialState = {
    error: null,
    success: null,
    token: null,
    profile: null,
    pincode: null,
    userinfo: null,
    currentAchivemenSelected: null,
};

const reducer = (state, action) => {
    switch (action.type) {
      case GLOBAL_STATE_ACTIONS.ACHIVEMEN_SELECTED: return { ...state, currentAchivemenSelected: action.state };
      case GLOBAL_STATE_ACTIONS.ERROR: return { ...state, ...{error: action.state} };
      case GLOBAL_STATE_ACTIONS.SUCCESS: return { ...state, ...{success: action.state} };
      case GLOBAL_STATE_ACTIONS.TOKEN: {
        AsyncStorage.setItem('token', action.state)
        return { ...state, ...{token: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.PROFILE: {
        AsyncStorage.setItem('profile', JSON.stringify(action.state))
        return { ...state, ...{profile: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.PINCODE: {
        AsyncStorage.setItem('pincode', action.state)
        return { ...state, ...{pincode: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.USERINFO: {
        //암호화 저장소
        SecureStore.setItemAsync('userinfo', JSON.stringify(action.state))
        return { ...state, ...{userinfo: action.state} };
      }
      case GLOBAL_STATE_ACTIONS.LOGOUT: {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('profile')
        AsyncStorage.removeItem('pincode')
        SecureStore.deleteItemAsync('userinfo')
        return { ...state, ...{profile: null, token: null, pincode: null, userinfo: null} };
      }
      default: return state;
    }
  };

export const { dispatch: dispatchGlobalState, useGlobalState, getGlobalState } = createStore(reducer, initialState);

AsyncStorage.getItem('token')
.then(token => {
  if (token) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: token })
})

AsyncStorage.getItem('profile')
.then(profile => {
  if (profile) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: JSON.parse(profile) })
})

AsyncStorage.getItem('pincode')
.then(pincode => {
  if (pincode) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PINCODE, state: pincode })
})
//암호화 저장소
SecureStore.getItemAsync('userinfo')
.then(userinfo => {
  if (userinfo) dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.USERINFO, state: JSON.parse(userinfo) })
})