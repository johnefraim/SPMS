import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    baseURL: `${apiUrl}/api/personalDetails`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },

});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers
    }
    return config;
}
);

export const CreatePersonalDetails = (linkedin:string, 
                                    socialMedia:string,
                                    website:string,
                                    address:string,
                                    dob:string,
                                     )=>{
    return api.post(`/create`,{linkedin, socialMedia, website, address, dob});
}

export const GetPersonalDetails = (id: string)=>{
    return api.get(`/${id}`);
}

export const DeletePersonalDetails =(id:string)=>{
    return api.delete(`/delete/${id}`);
}

export const UpdatePersonalDetails = ( id:string, 
                                        linkedin:string, 
                                        socialMedia:string,
                                        website:string,
                                        address:string,
                                        dob:string,)=>{
    return api.put(`/update/${id}`, { linkedin, socialMedia, website, address, dob });
}