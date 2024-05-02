import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/educational-backgrounds',
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },

});

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