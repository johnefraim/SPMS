import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: `${apiUrl}/api/portfolio`,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
         // Log the request details
    console.log('token:', token);
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

export const deletePortfolio = (id: string) => {
  return api.delete(`/delete/${id}`);
}

export const updatePortfolio = (id: number, portfolioTitle: string, category: string, description: string, tagsKeywords: string) => {
  return api.put(`/update/${id}`, { portfolioTitle, category, description, tagsKeywords});
}
