export interface LoginData {
    username: string
    password: string
}

export interface LoginResponseType {
    access_token: string
    refresh_token: string
    userName: string
    userId: number
}

export interface ProfileResponseType {
    id: number
    username: string
}