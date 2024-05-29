import Image from 'next/image';
import React from 'react';

interface PersonalDetailsProps {
  photoUrl: string;
  name: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  socialMedia: string;
  website: string;
  address: string;
  dob: string;
  educationalBackground: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa: number;
    activities: string;
    description: string;
  }[];
  projectEntity: {
    projectImage: string;
    projectTitle: string;
    description: string;
    role: string;
    technologies: string;
    projectLink: string;
    projectGithub: string;
  }[];
  careerEntity: {
    jobTitle: string;
    employmentType: string;
    company: string;
    location: string;
    locationType: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    name: string;
    proficiency: string;
    yearsOfExperience: number;
    learningSource: string;
    lastUsed: string;
    endorsements: string;
    category: string;
  }[];
  certifications: {
    name: string;
    issuingOrganization: string;
    issuedDate: string;
    expirationDate: string;
    credentialId: string;
    photoUrl: string;
  }[];
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  photoUrl,
  name,
  bio,
  email,
  phone,
  linkedin,
  socialMedia,
  website,
  address,
  dob,
  educationalBackground,
  projectEntity,
  careerEntity,
  skills,
  certifications
}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center">
            <Image
              src={photoUrl}
              height={96}
              width={96}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-600">{bio}</p>
              <p className="text-gray-600">{address}</p>
              <div className="mt-2 flex space-x-4">
                <a href={`mailto:${email}`} className="text-blue-500">Email</a>
                <a href={`tel:${phone}`} className="text-blue-500">Phone</a>
                <a href={linkedin} className="text-blue-500">LinkedIn</a>
                <a href={socialMedia} className="text-blue-500">Social Media</a>
                <a href={`http://${website}`} className="text-blue-500">Website</a>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="mt-2 text-gray-700">
              {bio}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap mt-2">
              {skills.map(skill => (
                <span key={skill.name} className="px-3 py-1 mr-2 mt-2 bg-gray-200 rounded-full">{skill.name}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            {careerEntity.map(job => (
              <div key={job.company} className="mt-4">
                <h3 className="text-lg font-medium">{job.jobTitle} at {job.company}</h3>
                <p className="text-gray-600">{job.location} ({job.locationType})</p>
                <p className="text-gray-600">{job.startDate} - {job.endDate}</p>
                <p className="text-gray-600">{job.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Education</h2>
            {educationalBackground.map(edu => (
              <div key={edu.school} className="mt-4">
                <h3 className="text-lg font-medium">{edu.degree} in {edu.fieldOfStudy}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.name} className="mt-4">
                <h3 className="text-lg font-medium">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuingOrganization}</p>
                <p className="text-gray-600">Issued: {cert.issuedDate} | Expires: {cert.expirationDate}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            {projectEntity.map(project => (
              <div key={project.projectTitle} className="mt-4">
                <Image width={128} height={128} src={project.projectImage} alt={project.projectTitle} className="w-full h-32 object-cover rounded-lg"/>
                <h3 className="text-lg font-medium mt-2">{project.projectTitle}</h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-gray-600">Role: {project.role}</p>
                <p className="text-gray-600">Technologies: {project.technologies}</p>
                <div className="mt-2 flex space-x-4">
                  <a href={project.projectLink} className="text-blue-500">Project Link</a>
                  <a href={project.projectGithub} className="text-blue-500">GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
