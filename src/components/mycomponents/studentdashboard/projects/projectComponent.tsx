import React, { useState } from 'react';
import { CreateProjectDialog } from './createprojectdialog';
import ProjectListView from './projectlistview';

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
    const [refresh, setRefresh] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const refreshProject = () => {
        setRefresh(!refresh);
    };

    const showAlertMessage = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 8000);
    }

    return (
        <section>
            <div className="ml-4 mt-2 mr-2 w-full">
                <CreateProjectDialog showAlertDialog={showAlertMessage} refreshProjectList={refreshProject}/>
                <ProjectListView refreshList={refresh}/>
            </div>
        </section>
    );
};

export default ProjectComponent;