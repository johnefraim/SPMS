import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function updateSkills(
    programmingLanguages: string[],
    softwareApplications: string[],
    graphicDesignSoftware: string[]
) {
    // Logic to update the student's skills
    // For example, you can store the skills in an object or send them to a server

    // Print the updated skills
}

const SkillInput = () => {
    const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([]);
    const [softwareApplications, setSoftwareApplications] = useState<string[]>([]);
    const [graphicDesignSoftware, setGraphicDesignSoftware] = useState<string[]>([]);

    const handleProgrammingLanguagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgrammingLanguages(event.target.value.split(','));
    };

    const handleSoftwareApplicationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoftwareApplications(event.target.value.split(','));
    };

    const handleGraphicDesignSoftwareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGraphicDesignSoftware(event.target.value.split(','));
    };

    const handleRemoveProgrammingLanguage = (index: number) => {
        const updatedLanguages = [...programmingLanguages];
        updatedLanguages.splice(index, 1);
        setProgrammingLanguages(updatedLanguages);
    };

    const handleRemoveSoftwareApplication = (index: number) => {
        const updatedApplications = [...softwareApplications];
        updatedApplications.splice(index, 1);
        setSoftwareApplications(updatedApplications);
    };

    const handleRemoveGraphicDesignSoftware = (index: number) => {
        const updatedSoftware = [...graphicDesignSoftware];
        updatedSoftware.splice(index, 1);
        setGraphicDesignSoftware(updatedSoftware);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateSkills(programmingLanguages, softwareApplications, graphicDesignSoftware);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label>
                Programming Languages:
                {programmingLanguages.map((language, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ border: '1px solid black', padding: '5px', marginRight: '5px' }}>{language}</div>
                        <button type="button" onClick={() => handleRemoveProgrammingLanguage(index)}>x</button>
                    </div>
                ))}
                <Input type="text" onChange={handleProgrammingLanguagesChange} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setProgrammingLanguages([...programmingLanguages, e.currentTarget.value]);
                        e.currentTarget.value = '';
                    }
                }} />
            </Label>
            <br />
            <Label>
                Software Applications:
                {softwareApplications.map((application, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ border: '1px solid black', padding: '5px', marginRight: '5px' }}>{application}</div>
                        <button type="button" onClick={() => handleRemoveSoftwareApplication(index)}>x</button>
                    </div>
                ))}
                <Input type="text" onChange={handleSoftwareApplicationsChange} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setSoftwareApplications([...softwareApplications, e.currentTarget.value]);
                        e.currentTarget.value = '';
                    }
                }} />
            </Label>
            <br />
            <Label>
                Graphic Design Software:
                {graphicDesignSoftware.map((software, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ border: '1px solid black', padding: '5px', marginRight: '5px' }}>{software}</div>
                        <button type="button" onClick={() => handleRemoveGraphicDesignSoftware(index)}>x</button>
                    </div>
                ))}
                <Input type="text" onChange={handleGraphicDesignSoftwareChange} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setGraphicDesignSoftware([...graphicDesignSoftware, e.currentTarget.value]);
                        e.currentTarget.value = '';
                    }
                }} />
            </Label>
            <br />
            <Button type="submit">Update Skills</Button>
        </form>
    );
}

export default SkillInput;