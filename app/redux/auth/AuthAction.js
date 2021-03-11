
import { ActionTypes } from '../ActionTypes'
import AsyncStorage from '@react-native-community/async-storage'

export const signUpUser = (firstName, lastName, email, password, phoneNumber, career) => {

    return dispatch => {
        dispatch({ type: ActionTypes.SIGNUP_USER_START })
        AsyncStorage.setItem("athentication", JSON.stringify({
            fname: firstName,
            lname: lastName,
            email: email,
            password: password,
            number: phoneNumber,
            career: career

        }));
        dispatch({
            type: ActionTypes.SIGNUP_USER_SUCCESS,
            payload: {
                fname: firstName,
                lname: lastName,
                email: email,
                password: password,
                number: phoneNumber,
                career: career

            }
        })
    }
}