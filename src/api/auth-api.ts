import {instance} from "./todolists-api";

export const authAPI = {
    login(payload: LoginParamsType) {
        return instance.post<authResponseType<{ userId: number }>>('/auth/login', payload)
    },
    me() {
        return instance.get<authResponseType>('/auth/me')
    },
    logout() {
        return instance.delete<authResponseType>('/auth/login')
    },
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
type authResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}