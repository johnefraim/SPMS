import { useState, useEffect } from 'react';
import axios from 'axios';

interface PersonalDetail {
    id?: number;
    linkedin: string;
    socialMedia: string;
    website: string;
    address: string;
    dob: string;
}

interface PortfolioProps{
    portfolioAttribute: number;
}
const PersonalDetailsCRUD: React.FC<PortfolioProps> = ({portfolioAttribute}) => {
    const [details, setDetails] = useState<PersonalDetail[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<PersonalDetail>({
        linkedin: '',
        socialMedia: '',
        website: '',
        address: '',
        dob: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/personaldetails/${portfolioAttribute}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        ).then(response => {
            if(Array.isArray(response.data)) {
                setDetails(response.data);
            }else{
                console.error('Error: response data is not an array:', response.data);
            }})
            .catch(error => console.error('Error fetching personal details:', error));
        }
    }, [refresh]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedDetail(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDetail.id) {
            updateDetail(selectedDetail);
        } else {
            createDetail(selectedDetail);
        }
        setSelectedDetail({
            linkedin: '',
            socialMedia: '',
            website: '',
            address: '',
            dob: '',
        });
    };

    const createDetail = (detail: PersonalDetail) => {
        axios.post(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/personaldetails/create/${portfolioAttribute}`, detail,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(response => {setDetails(prevDetails => [...prevDetails, response.data]);
                setRefresh(!refresh);
            })
            .catch(error => console.error('Error creating detail:', error));
    };

    const updateDetail = (detail: PersonalDetail) => {
        axios.put(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/personaldetails/update/${detail.id}`, detail,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(response => setDetails(prevDetails => 
                prevDetails.map(d => d.id === response.data.id ? response.data : d)
            ))
            .catch(error => console.error('Error updating detail:', error));
    };

    const deleteDetail = (detail: PersonalDetail) => {
        axios.delete(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/personaldetails/delete/${detail.id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(() => setDetails(prevDetails => 
                prevDetails.filter(d => d.id !== detail.id)
            ))
            .catch(error => console.error('Error deleting detail:', error));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <form onSubmit={handleFormSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="linkedin"
                        value={selectedDetail.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="socialMedia"
                        value={selectedDetail.socialMedia}
                        onChange={handleInputChange}
                        placeholder="Social Media"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="website"
                        value={selectedDetail.website}
                        onChange={handleInputChange}
                        placeholder="Website"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="address"
                        value={selectedDetail.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="dob"
                        value={selectedDetail.dob}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
                    Save
                </button>
                <button 
                type="button" 
                onClick={() => selectedDetail.id && updateDetail(selectedDetail)} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            </form>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {details.map(detail => (
                    <div key={detail.id} className="p-4 bg-white rounded shadow-md">
                        <a className="text-blue-500 mb-2 block" href={detail.linkedin}><strong>LinkedIn</strong></a>
                        <a className="text-blue-500 mb-2 block" href={detail.socialMedia}><strong>Social Media</strong> </a>
                        <a className="text-blue-500 mb-2 block" href={detail.website}><strong>Website</strong></a>
                        <p className="text-gray-700 mb-2"><strong>Address:</strong> {detail.address}</p>
                        <p className="text-gray-700 mb-2"><strong>Date of Birth:</strong> {detail.dob}</p>
                        <button 
                            onClick={() => setSelectedDetail(detail)} 
                            className="px-2 py-1 bg-yellow-500 text-white rounded mr-4 hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteDetail(detail)} 
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalDetailsCRUD;
