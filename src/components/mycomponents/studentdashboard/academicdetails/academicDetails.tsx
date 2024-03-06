import React, { useState } from 'react';

const AcademicDetailsForm = () => {
    const [degree, setDegree] = useState('');
    const [institution, setInstitution] = useState('');
    const [major, setMajor] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [gpa, setGpa] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Academic Details
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="degree" className="sr-only">Degree/Program</label>
                            <input id="degree" name="degree" type="text" value={degree} onChange={e => setDegree(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Degree/Program" />
                        </div>
                        <div>
                            <label htmlFor="institution" className="sr-only">Institution</label>
                            <input id="institution" name="institution" type="text" value={institution} onChange={e => setInstitution(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Institution" />
                        </div>
                        <div>
                            <label htmlFor="major" className="sr-only">Major/Concentration</label>
                            <input id="major" name="major" type="text" value={major} onChange={e => setMajor(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Major/Concentration" />
                        </div>
                        <div>
                            <label htmlFor="graduationYear" className="sr-only">Year of Graduation</label>
                            <input id="graduationYear" name="graduationYear" type="number" value={graduationYear} onChange={e => setGraduationYear(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Year of Graduation" />
                        </div>
                        <div>
                            <label htmlFor="gpa" className="sr-only">GPA</label>
                            <input id="gpa" name="gpa" type="number" step="0.01" value={gpa} onChange={e => setGpa(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="GPA" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AcademicDetailsForm;