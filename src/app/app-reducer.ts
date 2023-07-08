const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

type initialStateType = typeof initialState
type actionType = SetAppStatusType | SetErrorType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type SetAppStatusType = ReturnType<typeof setAppStatus>
type SetErrorType = ReturnType<typeof setAppError>