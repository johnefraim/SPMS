import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: "http://localhost:8080/api/user",
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
});

export const getUserDetails = (userId:string) => {
    return api.get(`/${userId}/details`);
};

export const updateProfile = async (formData: FormData) => {
    try {
      const response = await api.put(`/update`, formData);
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };


