import axios from 'axios';

const token = localStorage.getItem('token');
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: `${apiUrl}/api/user`,
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


