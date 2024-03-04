import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/portfolio",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
         // Log the request details
    //console.log('token:', token);
    console.log('Request URL:', config.url);
    console.log('Request Headers:', config.headers);
    console.log('Request Data:', config.data);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const createPortfolio = (portfolioTitle: string,category: string, description: string, tagsKeywords: string) => {
  
  return api.post("/create", { portfolioTitle, category, description, tagsKeywords});
}

export const getMyPortfolios = (id: string) => {
  return api.get(`/${id}`);
}
