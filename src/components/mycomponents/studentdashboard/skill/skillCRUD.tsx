import { useState, useEffect } from 'react';
import axios from 'axios';

interface Skill {
    id?: number;
    name: string;
    proficiency: string;
    yearsOfExperience: number;
    learningSource: string;
    lastUsed: string;
    endorsements: string;
    category: string;
}

const initialSkill: Skill = {
    name: '',
    proficiency: '',
    yearsOfExperience: 0,
    learningSource: '',
    lastUsed: '',
    endorsements: '',
    category: '',
};

function SkillCRUD() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<Skill>(initialSkill);

    useEffect(() => {
        const fetchSkills = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.Id;
                try {
                    const response = await axios.get(`http://localhost:8080/api/skills/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const skillData = Array.isArray(response.data) ? response.data.map((skill: any) => ({
                        id: skill.id,
                        name: skill.name,
                        proficiency: skill.proficiency,
                        yearsOfExperience: skill.yearsOfExperience,
                        learningSource: skill.learningSource,
                        lastUsed: skill.lastUsed,
                        endorsements: skill.endorsements,
                        category: skill.category,
                    })) : [];
                    console.log('Skill data:', skillData);
                    setSkills(skillData);
                } catch (error) {
                    console.error('Error fetching skills:', error);
                }
            }
        };
    
        fetchSkills();
    }, []);
    

    const createSkill = async (skill: Skill) => {
        try {
            const response = await axios.post('http://localhost:8080/api/skills/create', skill, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSkills(prevSkills => [...prevSkills, response.data]);
        } catch (error) {
            console.error('Failed to create skill:', error);
        }
    };

    const updateSkill = async (skill: Skill) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/skills/update/${skill.id}`, skill, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSkills(prevSkills => prevSkills.map(s => s.id === response.data.id ? response.data : s));
        } catch (error) {
            console.error('Failed to update skill:', error);
        }
    };

    const deleteSkill = async (skill: Skill) => {
        try {
            await axios.delete(`http://localhost:8080/api/skills/delete/${skill.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setSkills(prevSkills => prevSkills.filter(s => s.id !== skill.id));
        } catch (error) {
            console.error('Failed to delete skill:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedSkill.id) {
            await updateSkill(selectedSkill);
        } else {
            await createSkill(selectedSkill);
        }
        setSelectedSkill(initialSkill);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 h-[80vh] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6">Skills</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedSkill.id ? 'Edit Skill' : 'Add Skill'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={selectedSkill.name}
                        onChange={e => setSelectedSkill({ ...selectedSkill, name: e.target.value })}
                        placeholder="Name"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedSkill.proficiency}
                        onChange={e => setSelectedSkill({ ...selectedSkill, proficiency: e.target.value })}
                        placeholder="Proficiency"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        value={selectedSkill.yearsOfExperience}
                        onChange={e => setSelectedSkill({ ...selectedSkill, yearsOfExperience: parseInt(e.target.value) })}
                        placeholder="Years of Experience"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedSkill.learningSource}
                        onChange={e => setSelectedSkill({ ...selectedSkill, learningSource: e.target.value })}
                        placeholder="Learning Source"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedSkill.lastUsed}
                        onChange={e => setSelectedSkill({ ...selectedSkill, lastUsed: e.target.value })}
                        placeholder="Last Used"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedSkill.endorsements}
                        onChange={e => setSelectedSkill({ ...selectedSkill, endorsements: e.target.value })}
                        placeholder="Endorsements"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        value={selectedSkill.category}
                        onChange={e => setSelectedSkill({ ...selectedSkill, category: e.target.value })}
                        placeholder="Category"
                        className="border rounded p-2"
                        required
                    />
                </div>
                <button type="submit" className="mr-4 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                    Save
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-2">
                {skills.map(skill => (
                    <div key={skill.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">{skill.name}</h2>
                        <p className="text-gray-600">Proficiency: {skill.proficiency}</p>
                        <p className="text-gray-600">Years of Experience: {skill.yearsOfExperience}</p>
                        <p className="text-gray-600">Learning Source: {skill.learningSource}</p>
                        <p className="text-gray-600">Last Used: {skill.lastUsed}</p>
                        <p className="text-gray-600">Endorsements: {skill.endorsements}</p>
                        <p className="text-gray-600">Category: {skill.category}</p>
                        <div className="flex space-x-2 mt-4">
                            <button 
                                onClick={() => setSelectedSkill(skill)} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => deleteSkill(skill)} 
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

export default SkillCRUD;
