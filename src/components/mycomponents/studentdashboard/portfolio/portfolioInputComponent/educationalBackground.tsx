import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EducationalBackground = () => {
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");
    const [relevantCourses, setRelevantCourses] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [schoolLocation, setSchoolLocation] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [gpa, setGpa] = useState("");
    const [honors, setHonors] = useState("");
    const [yearGraduated, setYearGraduated] = useState("");
    const [academicHonors, setAcademicHonors] = useState("");
    const [scholarshipGraduationDate, setScholarshipGraduationDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="overflow-y-auto h-[500px] w-[500px]">
            <form onSubmit={handleSubmit}>
                <div>
                    <Label>Degree</Label>
                    <Input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Major</Label>
                    <Input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Relevant Courses</Label>
                    <Input
                        type="text"
                        value={relevantCourses}
                        onChange={(e) => setRelevantCourses(e.target.value)}
                    />
                </div>
                <div>
                    <Label>School Name</Label>
                    <Input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    />
                </div>
                <div>
                    <Label>School Location</Label>
                    <Input
                        type="text"
                        value={schoolLocation}
                        onChange={(e) => setSchoolLocation(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Graduation Date</Label>
                    <Input
                        type="date"
                        value={graduationDate}
                        onChange={(e) => setGraduationDate(e.target.value)}
                    />
                </div>
                <div>
                    <Label>GPA</Label>
                    <Input
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Honors</Label>
                    <Input
                        type="text"
                        value={honors}
                        onChange={(e) => setHonors(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Year Graduated</Label>
                    <Input
                        type="text"
                        value={yearGraduated}
                        onChange={(e) => setYearGraduated(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Academic Honors</Label>
                    <Input
                        type="text"
                        value={academicHonors}
                        onChange={(e) => setAcademicHonors(e.target.value)}
                    />
                </div>
                <Button type="submit">Save</Button>
            </form>
        </div>
    )
}

export default EducationalBackground;