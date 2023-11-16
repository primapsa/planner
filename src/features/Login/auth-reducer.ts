import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/auth-api";

const init: AuthInitState = {
    isLoggedIn: false
}
export const authReducer = (state = init, action: ActionType): AuthInitState => {
    switch (action.type) {
        case "LOGIN/SET-LOGIN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }

}

export const setLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-LOGIN', value} as const)

export const userLogin = (body: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(body).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(res.data.messages[0] || 'Error!'))
        }
    }).catch(res => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(res.data.messages[0] || 'Error!'))
    })
}
export const userLogout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setLoggedInAC(false))
        }
        dispatch(setAppStatusAC('succeeded'))
    }).catch(err => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.data.messages[0] || 'Authorization error happened!'))
    })
}
type ActionType = ReturnType<typeof setLoggedInAC>
type AuthInitState = {
    isLoggedIn: boolean
}
