import React, { useState } from 'react';

const ExperienceComponent: React.FC = () => {
    const [title, setTitle] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [locationType, setLocationType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [industry, setIndustry] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <form onSubmit={handleSubmit} className="p-8">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Title" />
                <input type="text" value={employmentType} onChange={e => setEmploymentType(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Employment Type" />
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Company Name" />
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Location" />
                <input type="text" value={locationType} onChange={e => setLocationType(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Location Type" />
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Start Date" />
                <label>End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="End Date" />
                <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Industry" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Description"></textarea>
                <button type="submit" className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ExperienceComponent;