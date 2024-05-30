import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
    
    baseURL: `${apiUrl}/api/educational-backgrounds`,
    headers: {
        "Content-Type": "application/json",
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

export const CreateAcademicDetails = (
                                    school:string, 
                                    degree:string,
                                    fieldOfStudy:string,
                                    startDate:string,
                                    endDate:string,
                                    gpa:number,
                                    activities:string,
                                    description:string,
                                     )=>{
    return api.post("/create",{school, degree, fieldOfStudy, startDate, endDate, gpa, activities, description });
}

export const GetAcademicDetails = (id: string)=>{
    return api.get(`/${id}`);
}

export const DeleteAcademicDetails =(id:string)=>{
    return api.delete(`/delete/${id}`);
}

export const UpdateAcademicDetails = (
                                    id:string,
                                    school:string, 
                                    degree:string,
                                    fieldOfStudy:string,
                                    startDate:string,
                                    endDate:string,
                                    gpa:number,
                                    activities:string,
                                    description:string,)=>{
    return api.put(`/update/${id}`, {school, degree,fieldOfStudy, startDate, endDate, gpa, activities, description});
}