import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createPersonalDetails } from '@/app/api/portfolioTemplateService';

interface portfolioProps {
    portfolioId: number;
}

interface PersonalDetailsProps {
    portfolio_id: number;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ portfolio_id }) => {
    const [contactInfo, setContactInfo] = useState({
        linkedin: '',
        socialMedia: '',
        website: '',
        address: '',
        dob: '',
        portfolio_id: portfolio_id,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactInfo((prevContactInfo) => ({
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
        formData.append('portfolio_id', contactInfo.portfolio_id.toString());

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