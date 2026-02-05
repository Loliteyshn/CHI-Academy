import { LoginResponseType, ProfileResponseType } from "../types/LoginData";
import { instance } from "./axiosInstance"

export const register = async (data: { username: string, password: string }) => {
    try {
        const response = await instance.post(`/users/register`, data)
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}

export const login = async (credentials: { username: string, password: string }) => {
    try {
        const response = await instance.post(`/api/auth/login`, credentials);
        return response.data as LoginResponseType;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}

export const getUserProfile = async (token: string) => {
    try {
        const response = await instance.get(`/users/my-profile`);
        return response.data as ProfileResponseType;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}