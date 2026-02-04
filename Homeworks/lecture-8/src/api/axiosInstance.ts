import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://playground.zenberry.one',
    timeout: 10000,
})


instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401 || status === 403) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);