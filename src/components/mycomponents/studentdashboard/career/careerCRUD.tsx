import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '@/app/api/authService';

interface Career {
    id?: number;
    jobTitle: string;
    employmentType: string;
    company: string;
    location: string;
    locationType: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface CareerProps {
    portfolioAttribute: number;
}

const CareerCRUD: React.FC<CareerProps> = ({ portfolioAttribute }) => {
    const [careers, setCareers] = useState<Career[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [selectedCareer, setSelectedCareer] = useState<Career>({
        jobTitle: '',
        employmentType: '',
        company: '',
        location: '',
        locationType: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    useEffect(() => {
        const token = getToken();
        if (token) {
            axios.get(`${apiUrl}/api/careers/${portfolioAttribute}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                },
            }).then(response => {
                if (Array.isArray(response.data)) {
                    setCareers(response.data);
                }
            }).catch(error => console.error('Error fetching careers:', error));
        }
    }, [portfolioAttribute]);

    const createCareer = (career: Career) => {
        axios.post(`${apiUrl}/api/careers/create/${portfolioAttribute}`, career, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        }).then(response => setCareers([...careers, response.data]))
            .catch(error => console.error('Error creating career:', error));
    };

    const updateCareer = (career: Career) => {
        axios.put(`${apiUrl}/api/careers/update/${career.id}`, career, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        }).then(response => setCareers(careers.map(c => c.id === response.data.id ? response.data : c)))
            .catch(error => console.error('Error updating career:', error));
    };

    const deleteCareer = (career: Career) => {
        axios.delete(`${apiUrl}/api/careers/delete/${career.id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        }).then(() => setCareers(careers.filter(c => c.id !== career.id)))
            .catch(error => console.error('Error deleting career:', error));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedCareer.id) {
            updateCareer(selectedCareer);
        } else {
            createCareer(selectedCareer);
        }
        setSelectedCareer({
            jobTitle: '',
            employmentType: '',
            company: '',
            location: '',
            locationType: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    };

    return (
        <div className="bg-gray-100 max-w-4xl mx-auto p-4 h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
                <input
                    type="text"
                    value={selectedCareer.jobTitle}
                    onChange={e => setSelectedCareer({ ...selectedCareer, jobTitle: e.target.value })}
                    placeholder="Job Title"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    value={selectedCareer.employmentType}
                    onChange={e => setSelectedCareer({ ...selectedCareer, employmentType: e.target.value })}
                    placeholder="Employment Type"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    value={selectedCareer.company}
                    onChange={e => setSelectedCareer({ ...selectedCareer, company: e.target.value })}
                    placeholder="Company"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    value={selectedCareer.location}
                    onChange={e => setSelectedCareer({ ...selectedCareer, location: e.target.value })}
                    placeholder="Location"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    value={selectedCareer.locationType}
                    onChange={e => setSelectedCareer({ ...selectedCareer, locationType: e.target.value })}
                    placeholder="Location Type"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    value={selectedCareer.startDate}
                    onChange={e => setSelectedCareer({ ...selectedCareer, startDate: e.target.value })}
                    placeholder="Start Date"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    value={selectedCareer.endDate}
                    onChange={e => setSelectedCareer({ ...selectedCareer, endDate: e.target.value })}
                    placeholder="End Date"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <textarea
                    value={selectedCareer.description}
                    onChange={e => setSelectedCareer({ ...selectedCareer, description: e.target.value })}
                    placeholder="Description"
                    required
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => selectedCareer.id && updateCareer(selectedCareer)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Update
                    </button>
                </div>
            </form>
            <div className="max-w-2xl mx-auto">
                {careers.map(career => (
                    <div key={career.id} className="bg-white shadow-md rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{career.jobTitle}</h2>
                        <p>Employment Type: {career.employmentType}</p>
                        <p>Company: {career.company}</p>
                        <p>Location: {career.location}</p>
                        <p>Location Type: {career.locationType}</p>
                        <p>Start Date: {career.startDate}</p>
                        <p>End Date: {career.endDate}</p>
                        <p>Description: {career.description}</p>
                        <div className="flex space-x-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => setSelectedCareer(career)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => deleteCareer(career)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareerCRUD;
