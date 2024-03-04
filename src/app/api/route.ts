import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },

});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${{token}}`;
    }
    // Log the request details
    console.log('token:', token);
    console.log('Request URL:', config.url);
    console.log('Request Headers:', config.headers);
    console.log('Request Data:', config.data);
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
    console.log(authenticated);
    if (token && token !== "undefined" && token !== "null") {
        return true;
    }
    return false;
};

export default api;
