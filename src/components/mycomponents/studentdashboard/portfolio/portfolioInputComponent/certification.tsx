import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const Certification = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        issuingOrganization: '',
        issuedDate: '',
        issuedYear: '',
        expirationDate: '',
        expirationYear: '',
        credentialId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save the formData to the database
        // You can make an API call here to save the data
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Label>Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Issuing Organization</Label>
                <Input
                    type="text"
                    name="issuingOrganization"
                    value={formData.issuingOrganization}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Issued Date</Label>
                <Input
                    type="month"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Expiration Date</Label>
                <Input
                    type="month"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Credential ID</Label>
                <Input
                    type="text"
                    name="credentialId"
                    value={formData.credentialId}
                    onChange={handleChange}
                />
            </div>
            <Label>Certificate Images:</Label>
            <Input type="file" multiple onChange={handleImageChange} />
            <div className="grid grid-cols-3 gap-4">
                {images.map((imageUrl, index) => (
                <Image height={128} width={123} key={index} src={imageUrl} alt={`Certification Image ${index + 1}`} className="w-72 h-72 object-cover" />
                ))}
            </div>

            <Button type="submit">Save</Button>
        </form>
    );
}

export default Certification;