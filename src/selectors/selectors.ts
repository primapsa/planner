import {AppRootStateType} from "../app/store";

export const getState = (state:AppRootStateType) => state.app.status
export const getAuthLogin = (state:AppRootStateType) => state.auth.isLoggedIn
export const getAppInitialized = (state:AppRootStateType) => state.app.isInitialized
export const getAppError = (state:AppRootStateType) =>  state.app.error
export const getTasks = (state:AppRootStateType) => state.tasks
export const getTodolists = (state: AppRootStateType) => state.todolists