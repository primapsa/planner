import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITAIALIZED":
            return {...state, isInitialized: action.status}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export const setCurrentAuthStatus = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(respond => {
        if (respond.data.resultCode === 0) {
            dispatch(setLoggedInAC(true))
        } else {
            dispatch(setLoggedInAC(false))
        }
        dispatch(setAppStatusAC('succeeded'))
    }).catch(err => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(err.data.messages[0] || 'Authorization error happened!'))
    })
        .finally(() => {
                dispatch(setAppInitializedStatus(true))
            }
        )
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedStatus = (status: boolean) => ({type: 'APP/SET-INITAIALIZED', status} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedStatus>
