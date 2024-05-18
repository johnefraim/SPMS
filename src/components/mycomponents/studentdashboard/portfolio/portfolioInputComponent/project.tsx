
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Project = () => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [role, setRole] = useState('');
        const [technology, setTechnology] = useState('');
        const [link, setLink] = useState('');
        const [github, setGithub] = useState('');

        const handleSave = () => {
            // Save the project details here
            // You can use the values of title, description, role, technology, link, and github
        };

        const [images, setImages] = useState<string[]>([]);

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const fileList = e.target.files;
            if (fileList) {
            const imageUrls: string[] = [];
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const imageUrl = URL.createObjectURL(file);
                imageUrls.push(imageUrl);
            }
            setImages(imageUrls);
            }
        };

        return (
            <div className="overflow-y-auto h-[500px] w-[600px]">
            <Label>Title:</Label>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <Label>Description:</Label>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

            <Label>Role:</Label>
            <Input type="text" value={role} onChange={(e) => setRole(e.target.value)} />

            <Label>Technology Used:</Label>
            <Input type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} />

            <Label>Project Link:</Label>
            <Input type="text" value={link} onChange={(e) => setLink(e.target.value)} />

            <Label>Project GitHub:</Label>
            <Input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />Label
            <Label>Project Images:</Label>
            <Input type="file" multiple onChange={handleImageChange} />
            
            <div className="grid grid-cols-3 gap-4">
                {images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Project Image ${index + 1}`} className="w-72 h-72 object-cover" />
                ))}
            </div>
            <Button onClick={handleSave}>Save</Button>
            </div>
        );
    };

export default Project;