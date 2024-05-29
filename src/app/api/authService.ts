import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },

});


// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${{token}}`;
//     }
//     // Log the request details
//     console.log('token:', token);
//     console.log('Request URL:', config.url);
//     console.log('Request Headers:', config.headers);
//     console.log('Request Data:', config.data);
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

api.interceptors.response.use(response => {
    // Log the response details
    console.log('Response:', response);
    return response;
}, error => {
    return Promise.reject(error);
});

export const authenticate = (email: string, password: string) => {
    return api.post('/authenticate', { email, password }, 
    {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }},
    );
};

export const register = (firstname: string, lastname: string, email: string, password: string, role: string) => {
    return api.post('/register', { firstname, lastname, email, password, role });
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
    }
};

export const authenticated =()=>{
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
};

export const getRole = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('role');
    }
};

export const getName = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('name');
    }
}

export const getToken = () => {

    if(typeof window !== 'undefined'){
        return localStorage.getItem('token');
    }
}

export const setUser = (token: string, name: string, role: string) => {
    if (typeof window!== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('role', role);
      }
}
export default api;
