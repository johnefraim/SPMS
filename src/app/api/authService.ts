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

api.interceptors.response.use(response => {
    // Log the response details
    console.log('Response:', response);
    return response;
}, error => {
    return Promise.reject(error);
});

export const authenticate = (email: string, password: string) => {
    return api.post('/authenticate', { email, password });
};

export const register = (firstname: string, lastname: string, email: string, password: string, role: string) => {
    return api.post('/register', { firstname, lastname, email, password, role });
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
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
