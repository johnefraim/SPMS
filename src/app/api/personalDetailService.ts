import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/personalDetails',
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