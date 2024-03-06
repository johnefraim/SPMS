import React, { useState } from 'react';
import Image from 'next/image';
import { url } from 'inspector';
interface ProjectProps {
    title: string;
    description: string;
    role: string;
    techStack: string[];
}

const ProjectComponent = () => {
    const [projectImage, setSelectedImages] = useState<File | null>(null);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formRole, setFormRole] = useState('');
    const [formTechStack, setFormTechStack] = useState('');
    const [url  , setUrl] = useState('');


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImages(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <form onSubmit={handleSubmit} className="md:flex">
                <div className="md:flex-shrink-0">
                {projectImage && (
                    <Image src={URL.createObjectURL(projectImage)} width={32} height={64} alt="Profile" className="mt-4 w-32 h-32 object-cover rounded-full" />
                )}
                </div>
                <div className="p-8">
                    <input type="text" value={formTitle} onChange={e => setFormTitle(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Title" />
                    <textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Description"></textarea>
                    <input type="text" value={formRole} onChange={e => setFormRole(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Role" />
                    <input type="text" value={formTechStack} onChange={e => setFormTechStack(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="Tech Stack" />
                    <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm mb-4" placeholder="URL" />
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Images
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <input type="file" multiple onChange={handleImageChange} className="focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectComponent;