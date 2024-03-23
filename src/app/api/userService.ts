import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/user',
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
    //console.log('token:', token);
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

export const getUserDetails = (id: string) => {
    return api.get(`/${id}`);
};

