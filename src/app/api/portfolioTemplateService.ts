import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: `${apiUrl}/api/personalDetails`,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

});

//personal details
export const createPersonalDetails = (formdata: FormData) => {
  return api.post("/create", formdata);
}

export const getPersonalDetails = (id: string) => {
  return api.get(`/${id}`);
}

export const deletePersonalDetails = (id: string) => {
    return api.delete(`/delete/${id}`);
    }

export const updatePersonalDetails = ( id: string, 
                                        firstName: string, 
                                        lastName: string, 
                                        email: string, 
                                        phone: string, 
                                        address: string, 
                                        city: string, 
                                        state: string, 
                                        zip: string, 
                                        country: string) => {    
  return api.put(`/update/${id}`, { firstName, lastName, email, phone, address, city, state, zip, country });
}