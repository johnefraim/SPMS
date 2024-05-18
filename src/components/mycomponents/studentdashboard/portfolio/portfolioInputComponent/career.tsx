import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CareerProps {
    title: string;
    employmentType: string;
    companyName: string;
    location: string;
    locationType: string;
    startDate: string;
    startYear: string;
    endDate: string;
    endYear: string;
    description: string;
}

const Career: React.FC<CareerProps> = () => {
    const [formData, setFormData] = React.useState({
        title: '',
        employmentType: '',
        companyName: '',
        location: '',
        locationType: '',
        startDate: '',
        startYear: '',
        endDate: '',
        endYear: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save the formData to the database
        // You can make an API call here to save the data
        console.log(formData);
    };

    return (
        <div className="overflow-y-auto h-[500px] w-[500px]">
        <form onSubmit={handleSubmit}>
            <div>
                <Label>Title</Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Employment Type</Label>
                <Input
                    type="text"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Location</Label>
                <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Location Type</Label>
                <Input
                    type="text"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Start Date</Label>
                <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Start Year</Label>
                <Input
                    type="text"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>End Date</Label>
                <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>End Year</Label>
                <Input
                    type="text"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Description</Label>
                <Input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit">Save</Button>
        </form>
        </div>
    );
};

export default Career;