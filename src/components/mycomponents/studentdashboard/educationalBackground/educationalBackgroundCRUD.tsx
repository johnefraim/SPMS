import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '@/app/api/authService';

interface EducationalBackground {
    id?: number;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa: string;
    activities: string;
    description: string;
}

interface EducationalBackgroundProps {
    portfolioAttribute: number;
}


const EducationalBackgroundCRUD: React.FC<EducationalBackgroundProps> = ({portfolioAttribute}) => {
    const [backgrounds, setBackgrounds] = useState<EducationalBackground[]>([]);
    const [selectedBackground, setSelectedBackground] = useState<EducationalBackground>({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        activities: '',
        description: '',
    });

    useEffect(() => {
        const fetchBackgrounds = async () => {
        const token = getToken();
        if(token){
            const response = await axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/educational-backgrounds/${portfolioAttribute}`,
            {
                headers: {'Authorization': `Bearer ${token}`,},
            });
            const backgroundData = Array.isArray(response.data) ? response.data.map((background: any) => ({
                id: background.id,
                school: background.school,
                degree: background.degree,
                fieldOfStudy: background.fieldOfStudy,
                startDate: background.startDate,
                endDate: background.endDate,
                gpa: background.gpa,
                activities: background.activities,
                description: background.description,
            })) : [];
            setBackgrounds(backgroundData);
        }
        };
        fetchBackgrounds();
    }, [portfolioAttribute]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSelectedBackground(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const gpa = parseFloat(selectedBackground.gpa);
        if (!Number.isInteger(gpa) || gpa < 1 || gpa > 5) {
            alert('GPA must be a whole number between 1 and 5.');
        return;
        }

        if (selectedBackground.id) {
            updateBackground(selectedBackground);
        } else {
            createBackground(selectedBackground);
        }
        setSelectedBackground({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            gpa: '',
            activities: '',
            description: '',
        });
    };

    const createBackground = async (background: EducationalBackground) => {
        await axios.post(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/educational-backgrounds/create/${portfolioAttribute}`, background,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        }
        )
            .then(response => setBackgrounds(prevBackgrounds => [...prevBackgrounds, response.data]))
            .catch(error => console.error('Error creating background:', error));
    };

    const updateBackground = (background: EducationalBackground) => {
        axios.put(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/educational-backgrounds/update/${background.id}`, background,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        }
        )
            .then(response => setBackgrounds(prevBackgrounds => 
                prevBackgrounds.map(b => b.id === response.data.id ? response.data : b)
            ))
            .catch(error => console.error('Error updating background:', error));
    };

    const deleteBackground = (background: EducationalBackground) => {
        axios.delete(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/educational-backgrounds/delete/${background.id}`,
        {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            },
        }
        )
            .then(() => setBackgrounds(prevBackgrounds => 
                prevBackgrounds.filter(b => b.id !== background.id)
            ))
            .catch(error => console.error('Error deleting background:', error));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <form onSubmit={handleFormSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="school"
                        value={selectedBackground.school}
                        onChange={handleInputChange}
                        placeholder="School"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="degree"
                        value={selectedBackground.degree}
                        onChange={handleInputChange}
                        placeholder="Degree"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="fieldOfStudy"
                        value={selectedBackground.fieldOfStudy}
                        onChange={handleInputChange}
                        placeholder="Field of Study"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="startDate"
                        value={selectedBackground.startDate}
                        onChange={handleInputChange}
                        placeholder="Start Date"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="endDate"
                        value={selectedBackground.endDate}
                        onChange={handleInputChange}
                        placeholder="End Date"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="gpa"
                        min="1" 
                        max="5" 
                        step="1" 
                        value={selectedBackground.gpa}
                        onChange={handleInputChange}
                        placeholder="GPA"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="activities"
                        value={selectedBackground.activities}
                        onChange={handleInputChange}
                        placeholder="Activities"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="description"
                        value={selectedBackground.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="px-4 mr-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
                <button 
                type="button" 
                onClick={() => selectedBackground.id && updateBackground(selectedBackground)} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            </form>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {backgrounds.map(background => (
                    <div key={background.id} className="p-4 bg-white rounded shadow-md">
                        <p className="text-gray-700 mb-2"><strong>School:</strong> {background.school}</p>
                        <p className="text-gray-700 mb-2"><strong>Degree:</strong> {background.degree}</p>
                        <p className="text-gray-700 mb-2"><strong>Field of Study:</strong> {background.fieldOfStudy}</p>
                        <p className="text-gray-700 mb-2"><strong>Start Date:</strong> {background.startDate}</p>
                        <p className="text-gray-700 mb-2"><strong>End Date:</strong> {background.endDate}</p>
                        <p className="text-gray-700 mb-2"><strong>GPA:</strong> {background.gpa}</p>
                        <p className="text-gray-700 mb-2"><strong>Activities:</strong> {background.activities}</p>
                        <p className="text-gray-700 mb-2"><strong>Description:</strong> {background.description}</p>
                        <button 
                            onClick={() => setSelectedBackground(background)} 
                            className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteBackground(background)} 
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

export default EducationalBackgroundCRUD;
