import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/project",
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
    //console.log('token:', token);
    console.log('Request URL:', config.url);
    //console.log('Request Headers:', config.headers);
    //console.log('Request Data:', config.data);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const createProject = (portfolioTitle: string,category: string, description: string, tagsKeywords: string) => {
  
  return api.post("/project", { portfolioTitle, category, description, tagsKeywords});
}

export const getMyProject = (id: string) => {
  return api.get(`/${id}`);
}

export const deleteProject = (id: string) => {
  return api.delete(`/delete/${id}`);
}

export const updateProject = (projectId:number, projectImage:string, projectTitle :string, Role: string, technologies: string, projectLink: string, projectGithub: string) => {
  return api.put(`/update/${projectId}`, {projectId, projectImage, projectTitle, Role, technologies, projectLink, projectGithub});
}