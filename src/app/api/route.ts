import axios from 'axios';
import { redirect } from 'next/navigation';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the token in the headers
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const authenticate = (email: string, password: string) => {
    return api.post('/authenticate', { email, password });
};

export const logout = () => {
    localStorage.removeItem('token');
    console.log('logged out');
    return api.post('/logout');
};

export const authenticated =()=>{
    if (localStorage.getItem('token') !== null){
        return true;
    }
};

export default api;
