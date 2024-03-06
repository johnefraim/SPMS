import React, { useState } from 'react';

const CertificationComponent=() => {
    const [name, setName] = useState('');
    const [issuingOrganization, setIssuingOrganization] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [credentialId, setCredentialId] = useState('');
    const [credentialUrl, setCredentialUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <form onSubmit={handleSubmit} className="p-8">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Name" />
                <input type="text" value={issuingOrganization} onChange={e => setIssuingOrganization(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Issuing Organization" />
                <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Issue Date" />
                <input type="date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Expiration Date" />
                <input type="text" value={credentialId} onChange={e => setCredentialId(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Credential ID" />
                <input type="url" value={credentialUrl} onChange={e => setCredentialUrl(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Credential URL" />
                <button type="submit" className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CertificationComponent;