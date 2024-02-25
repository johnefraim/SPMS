import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },

});


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
    return api.post('/logout');
};

export const authenticated =()=>{
    const token = localStorage.getItem('token');
    
    if (token && token !== "undefined" && token !== "null") {
        return true;
    }
    return false;
};

export default api;
