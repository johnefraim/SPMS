import { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
    id?: number;
    projectImage: string;
    projectTitle: string;
    description: string;
    role: string;
    technologies: string;
    projectLink: string;
    projectGithub: string;
}

const ProjectCRUD: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project>({
        projectImage: '',
        projectTitle: '',
        description: '',
        role: '',
        technologies: '',
        projectLink: '',
        projectGithub: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if(token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.Id;
            console.log(typeof userId);
            axios.get(`http://localhost:8080/api/projects/user/${userId.toString()}`, 
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        ).then(response =>{ 
                if(Array.isArray(response.data)) {
                setProjects(response.data)
            } else {
                console.error('Error: response data is not an array:', response.data);
            }})
            .catch(error => console.error('Error fetching projects:', error));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSelectedProject(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedProject.id) {
            updateProject(selectedProject);
        } else {
            createProject(selectedProject);
        }
        setSelectedProject({
            projectImage: '',
            projectTitle: '',
            description: '',
            role: '',
            technologies: '',
            projectLink: '',
            projectGithub: '',
        });
    };

    const createProject = (project: Project) => {

        axios.post('http://localhost:8080/api/projects', project,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(response => setProjects(prevProjects => [...prevProjects, response.data]))
            .catch(error => console.error('Error creating project:', error));
    };

    const updateProject = (project: Project) => {
        axios.put(`http://localhost:8080/api/projects/${project.id}`, project,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(response => setProjects(prevProjects =>
                prevProjects.map(p => p.id === response.data.id ? response.data : p)
            ))
            .catch(error => console.error('Error updating project:', error));
    };

    const deleteProject = (project: Project) => {
        axios.delete(`http://localhost:8080/api/projects/${project.id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
        )
            .then(() => setProjects(prevProjects =>
                prevProjects.filter(p => p.id !== project.id)
            ))
            .catch(error => console.error('Error deleting project:', error));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <form onSubmit={handleFormSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="projectImage"
                        value={selectedProject.projectImage}
                        onChange={handleInputChange}
                        placeholder="Project Image URL"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="projectTitle"
                        value={selectedProject.projectTitle}
                        onChange={handleInputChange}
                        placeholder="Project Title"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="description"
                        value={selectedProject.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="role"
                        value={selectedProject.role}
                        onChange={handleInputChange}
                        placeholder="Role"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="technologies"
                        value={selectedProject.technologies}
                        onChange={handleInputChange}
                        placeholder="Technologies"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="projectLink"
                        value={selectedProject.projectLink}
                        onChange={handleInputChange}
                        placeholder="Project Link"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="projectGithub"
                        value={selectedProject.projectGithub}
                        onChange={handleInputChange}
                        placeholder="GitHub Link"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
            </form>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <div key={project.id} className="p-4 bg-white rounded shadow-md">
                        <img src={project.projectImage} alt={project.projectTitle} className="w-full h-32 object-cover rounded mb-4"/>
                        <h2 className="text-xl font-bold mb-2">{project.projectTitle}</h2>
                        <p className="text-gray-700 mb-2">{project.description}</p>
                        <p className="text-gray-700 mb-2"><strong>Role:</strong> {project.role}</p>
                        <p className="text-gray-700 mb-2"><strong>Technologies:</strong> {project.technologies}</p>
                        <a href={project.projectLink} className="text-blue-500 mb-2 block">Project Link</a>
                        <a href={project.projectGithub} className="text-blue-500 mb-2 block">GitHub Link</a>
                        <button 
                            onClick={() => setSelectedProject(project)} 
                            className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteProject(project)} 
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

export default ProjectCRUD;
