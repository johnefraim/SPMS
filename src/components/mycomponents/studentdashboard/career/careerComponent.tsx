import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function CareerCRUD() {
    const [careers, setCareers] = useState<Career[]>([]);
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
        axios.get('/api/careers')
            .then(response => setCareers(response.data))
            .catch(error => console.error('Error fetching careers:', error));
    }, []);

    const createCareer = (career: Career) => {
        axios.post('/api/careers', career)
            .then(response => setCareers([...careers, response.data]))
            .catch(error => console.error('Error creating career:', error));
    };

    const updateCareer = (career: Career) => {
        axios.put(`/api/careers/${career.id}`, career)
            .then(response => setCareers(careers.map(c => c.id === response.data.id ? response.data : c)))
            .catch(error => console.error('Error updating career:', error));
    };

    const deleteCareer = (career: Career) => {
        axios.delete(`/api/careers/${career.id}`)
            .then(() => setCareers(careers.filter(c => c.id !== career.id)))
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
        <div className="bg-gray-100 max-w-4xl mx-auto p-4 h-[80vh] overflow-y-auto">
            <div className="max-w-2xl mx-auto">
                {careers.map(career => (
                    <div key={career.id} className="bg-white shadow-md rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{career.jobTitle}</h2>
                        {/* Render other fields */}
                        <p>Employment Type: {career.employmentType}</p>
                        <p>Company: {career.company}</p>
                        <p>Location: {career.location}</p>
                        {/* Render other fields */}
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedCareer(career)}>Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => deleteCareer(career)}>Delete</button>
                        </div>
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
                    <input type="text" value={selectedCareer.jobTitle} onChange={e => setSelectedCareer({...selectedCareer, jobTitle: e.target.value})} placeholder="Job Title" required className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    <input type="text" value={selectedCareer.employmentType} onChange={e => setSelectedCareer({...selectedCareer, employmentType: e.target.value})} placeholder="Employment Type" required className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    <input type="text" value={selectedCareer.company} onChange={e => setSelectedCareer({...selectedCareer, company: e.target.value})} placeholder="Company" required className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    <input type="text" value={selectedCareer.location} onChange={e => setSelectedCareer({...selectedCareer, location: e.target.value})} placeholder="Location" required className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    {/* Render other fields */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Save</button>
                </form>
            </div>
        </div>
    );
}

export default CareerCRUD;
