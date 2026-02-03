import { instance } from "./axiosInstance"

export const register = async (data: { username: string, password: string }) => {
    try {
        const response = await instance.post(`/users/register`, data)
        console.log(response.data);
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
    // testtest
    // name: testlkjh
}


export const login = async (credentials: { username: string, password: string }) => {
    try {
        // const response = await instance.post(`/api/auth/login`, credentials);
        // console.log('login: ', response);
        // return response
        const response = await fetch(`https://playground.zenberry.one/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}

export const setAuthToken = (token: string) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const removeAuthToken = () => {
    instance.defaults.headers.common["Authorization"] = null;
}

export const getUserProfile = async (token: string) => {
    try {
        // const response = await instance.get(`/users/my-profile`);
        // console.log(response.data);
        // return response.data
        const response = await fetch(`https://playground.zenberry.one/users/my-profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}