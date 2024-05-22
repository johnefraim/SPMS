import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createPersonalDetails } from '@/app/api/portfolioTemplateService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface portfolioProps {
    portfolioId: number;
}

interface PersonalDetailsProps {
    linkedin: string;
    socialMedia: string;
    website: string;
    address: string;
    dob: string;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = () => {
    const [contactInfo, setContactInfo] = useState<PersonalDetailsProps>({
        linkedin: '',
        socialMedia: '',
        website: '',
        address: '',
        dob: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactInfo((prevContactInfo: PersonalDetailsProps) => ({
            ...prevContactInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('linkedin', contactInfo.linkedin);
        formData.append('socialMedia', contactInfo.socialMedia);
        formData.append('website', contactInfo.website);
        formData.append('address', contactInfo.address);
        formData.append('dob', contactInfo.dob);
        const response = await createPersonalDetails(formData);
        console.log(response);
    };

    return (
        <div className="overflow-y-auto h-[500px] w-[500px]">
            <h2>Contact Information</h2>
            <form onSubmit={handleSubmit}>
                <Label>
                    LinkedIn Profile URL
                    <Input
                        type="text"
                        name="linkedin"
                        value={contactInfo.linkedin}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    Professional Social Media Profile
                    <Input
                        type="text"
                        name="socialMedia"
                        value={contactInfo.socialMedia}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    Personal Website URL
                    <Input
                        type="text"
                        name="website"
                        value={contactInfo.website}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    Address:
                    <Input
                        type="text"
                        name="address"
                        value={contactInfo.address}
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    Date of Birth:
                    <Input
                        type="date"
                        name="dob"
                        value={contactInfo.dob}
                        onChange={handleChange}
                    />
                </Label>
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default PersonalDetails;