import { useState, useEffect } from 'react';
import axios from 'axios';

interface Certification {
    id?: number;
    name: string;
    issuingOrganization: string;
    issuedDate: string;
    expirationDate: string;
    credentialId: string;
    photoUrl: string;
}

const initialCertification: Certification = {
    name: '',
    issuingOrganization: '',
    issuedDate: '',
    expirationDate: '',
    credentialId: '',
    photoUrl: '',
};

interface CertificationProps {
    portfolioAttribute: number;
}


const CertificationCRUD: React.FC<CertificationProps> = ({portfolioAttribute})=> {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [selectedCertification, setSelectedCertification] = useState<Certification>(initialCertification);

    
    useEffect(() => {
        const fetchCertifications = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const response = await axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/certifications/${portfolioAttribute}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    const certificationData = Array.isArray(response.data) ? response.data.map((certification: any) => ({
                        id: certification.id,
                        name: certification.name,
                        issuingOrganization: certification.issuingOrganization,
                        issuedDate: certification.issuedDate,
                        expirationDate: certification.expirationDate,
                        credentialId: certification.credentialId,
                        photoUrl: certification.photoUrl,
                    })) : [];
                    setCertifications(certificationData); }
             } catch (error) {
                console.error('Failed to fetch certifications:', error);
            }
        };

        fetchCertifications();
    }, []);

    
    const createCertification = async (certification: Certification) => {
        try {
            const response = await axios.post(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/certifications/create/${portfolioAttribute}`, certification, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCertifications(prevCertifications => [...prevCertifications, response.data]);
        } catch (error) {
            console.error('Failed to create certification:', error);
        }
    };

    
    const updateCertification = async (certification: Certification) => {
        try {
            const response = await axios.put(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/certifications/update/${certification.id}`, certification, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCertifications(prevCertifications => prevCertifications.map(c => c.id === response.data.id ? response.data : c));
        } catch (error) {
            console.error('Failed to update certification:', error);
        }
    };

    const deleteCertification = async (certification: Certification) => {
        try {
            await axios.delete(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/certifications/delete/${certification.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            axios.interceptors.request.use(config => {
                console.log('Request was sent', config);
                return config;
            });
            setCertifications(prevCertifications => prevCertifications.filter(c => c.id !== certification.id));
        } catch (error) {
            console.error('Failed to delete certification:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedCertification.id) {
            await updateCertification(selectedCertification);
        } else {
            await createCertification(selectedCertification);
        }
        setSelectedCertification(initialCertification);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedCertification.id ? 'Edit Certification' : 'Add Certification'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={selectedCertification.name}
                        onChange={e => setSelectedCertification({ ...selectedCertification, name: e.target.value })}
                        placeholder="Name"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedCertification.issuingOrganization}
                        onChange={e => setSelectedCertification({ ...selectedCertification, issuingOrganization: e.target.value })}
                        placeholder="Issuing Organization"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="month"
                        value={selectedCertification.issuedDate}
                        onChange={e => setSelectedCertification({ ...selectedCertification, issuedDate: e.target.value })}
                        placeholder="Issued Date"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="month"
                        value={selectedCertification.expirationDate}
                        onChange={e => setSelectedCertification({ ...selectedCertification, expirationDate: e.target.value })}
                        placeholder="Expiration Date"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedCertification.credentialId}
                        onChange={e => setSelectedCertification({ ...selectedCertification, credentialId: e.target.value })}
                        placeholder="Credential ID"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedCertification.photoUrl}
                        onChange={e => setSelectedCertification({ ...selectedCertification, photoUrl: e.target.value })}
                        placeholder="Photo URL"
                        className="border rounded p-2"
                        required
                    />
                </div>
                <button type="submit" className="mr-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                    Save
                </button>
                <button 
                type="button" 
                onClick={() => selectedCertification.id && updateCertification(selectedCertification)} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-2">
                {certifications.map(certification => (
                    <div key={certification.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">{certification.name}</h2>
                        <p className="text-gray-600">Issued by: {certification.issuingOrganization}</p>
                        <p className="text-gray-600">Issued Date: {certification.issuedDate}</p>
                        <p className="text-gray-600">Expiration Date: {certification.expirationDate}</p>
                        <p className="text-gray-600">Credential ID: {certification.credentialId}</p>
                        <img src={certification.photoUrl} alt={certification.name} className="mt-2 mb-2 h-32 w-32 object-cover"/>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setSelectedCertification(certification)} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => deleteCertification(certification)} 
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
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

export default CertificationCRUD;
