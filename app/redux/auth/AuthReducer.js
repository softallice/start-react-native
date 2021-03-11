
import {ActionTypes} from '../ActionTypes'

const defaultProfile ={
    name:null,
    _id:null,
    email:null
}

export const AuthReducer = (
   
    state ={
        profile:defaultProfile,
        loading:false,
        loginCompleted:false,
        error:false,
        errorMessage:'',
        token:null
    },
    action

)=>{
    switch(action.type){

        case ActionTypes.SIGNUP_USER_START:
            return {
                ...state
            }
        case ActionTypes.SIGNUP_USER_SUCCESS:

            return {
                ...state
            }
        case ActionTypes.SIGNUP_USER_FAIL:
            return
        default:
            return state

    }

}