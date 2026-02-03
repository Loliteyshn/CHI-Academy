import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://playground.zenberry.one',
    timeout: 10000,
})

// Добавление interceptor для запросов

// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         console.log('token', token);

//         if (token) {
//             console.log('aici');

//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }

// );

instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);