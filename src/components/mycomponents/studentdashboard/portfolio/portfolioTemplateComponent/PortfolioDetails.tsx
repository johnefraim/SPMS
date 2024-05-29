import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

interface PersonalDetails {
  id: number;
  linkedin: string;
  socialMedia: string;
  website: string;
  address: string;
  dob: string;
  portfolioEntity: number;
}

interface EducationalBackground {
  id: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
  activities: string;
  description: string;
  portfolioEntity: number;
}

interface ProjectEntity {
  id: number;
  projectImage: string;
  projectTitle: string;
  description: string;
  role: string;
  technologies: string;
  projectLink: string;
  projectGithub: string;
  portfolioEntity: number;
}

interface CareerEntity {
  id: number;
  jobTitle: string;
  employmentType: string;
  company: string;
  location: string;
  locationType: string;
  startDate: string;
  endDate: string;
  description: string;
  portfolioEntity: number;
}

interface Skill {
  id: number;
  name: string;
  proficiency: string;
  yearsOfExperience: number;
  learningSource: string;
  lastUsed: string;
  endorsements: string;
  category: string;
  portfolioEntity: number;
}

interface Certification {
  id: number;
  name: string;
  issuingOrganization: string;
  issuedDate: string;
  expirationDate: string;
  credentialId: string;
  photoUrl: string;
  portfolioEntity: number;
}

interface Portfolio {
  id: number;
  portfolioTitle: string;
  category: string;
  description: string;
  tagsKeywords: string;
  dateCreated: string;
  dateUpdated: string;
  personalDetails: PersonalDetails[];
  educationalBackground: EducationalBackground[];
  projectEntity: ProjectEntity[];
  careerEntity: CareerEntity[];
  skills: Skill[];
  certifications: Certification[];
}

const PortfolioDetails: React.FC<{ id: string }> = ({ id }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const datatoken = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    if (!datatoken || !userRole) {
        router.replace('/');
        return;
    }

    if (userRole !== 'STUDENT') {
        switch (userRole) {
            case 'ADMIN':
                router.replace('/dashboard/dean');
                break;
            case 'MANAGER':
                router.replace('/dashboard/program-head');
                break;
            default:
                router.replace('/');
                break;
        }
    }
  }, [router]);


  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      axios
        .get<Portfolio>(`http://localhost:8080/api/portfolio/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => setPortfolio(response.data))
        .catch((error) => console.error('Error fetching portfolio:', error));
    }
  }, [id]);

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">{portfolio.portfolioTitle}</h1>
      <p className="text-xl mb-4">{portfolio.category}</p>
      <p className="mb-4">{portfolio.description}</p>
      <p className="mb-4">{portfolio.tagsKeywords}</p>

      <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">{portfolio.portfolioTitle}</h1>
      <p className="text-xl mb-4">{portfolio.category}</p>
      <p className="mb-4">{portfolio.description}</p>
      <p className="mb-4">{portfolio.tagsKeywords}</p>

      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      {portfolio.personalDetails.map((detail) => (
        <div key={detail.id} className="mb-4">
          <p><strong>LinkedIn:</strong> <a href={detail.linkedin} className="text-blue-500">{detail.linkedin}</a></p>
          <p><strong>Social Media:</strong> <a href={detail.socialMedia} className="text-blue-500">{detail.socialMedia}</a></p>
          <p><strong>Website:</strong> <a href={detail.website} className="text-blue-500">{detail.website}</a></p>
          <p><strong>Address:</strong> {detail.address}</p>
          <p><strong>Date of Birth:</strong> {new Date(detail.dob).toLocaleDateString()}</p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4">Educational Background</h2>
      {portfolio.educationalBackground.map((education) => (
        <div key={education.id} className="mb-4">
          <p><strong>School:</strong> {education.school}</p>
          <p><strong>Degree:</strong> {education.degree}</p>
          <p><strong>Field of Study:</strong> {education.fieldOfStudy}</p>
          <p><strong>Start Date:</strong> {new Date(education.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(education.endDate).toLocaleDateString()}</p>
          <p><strong>GPA:</strong> {education.gpa}</p>
          <p><strong>Activities:</strong> {education.activities}</p>
          <p><strong>Description:</strong> {education.description}</p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {portfolio.projectEntity.map((project) => (
        <div key={project.id} className="mb-4">
          <img src={project.projectImage} alt={project.projectTitle} className="w-full mb-4"/>
          <p><strong>Title:</strong> {project.projectTitle}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Role:</strong> {project.role}</p>
          <p><strong>Technologies:</strong> {project.technologies}</p>
          <p><strong>Project Link:</strong> <a href={project.projectLink} className="text-blue-500">{project.projectLink}</a></p>
          <p><strong>GitHub:</strong> <a href={project.projectGithub} className="text-blue-500">{project.projectGithub}</a></p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4">Career</h2>
      {portfolio.careerEntity.map((career) => (
        <div key={career.id} className="mb-4">
          <p><strong>Job Title:</strong> {career.jobTitle}</p>
          <p><strong>Employment Type:</strong> {career.employmentType}</p>
          <p><strong>Company:</strong> {career.company}</p>
          <p><strong>Location:</strong> {career.location}</p>
          <p><strong>Location Type:</strong> {career.locationType}</p>
          <p><strong>Start Date:</strong> {new Date(career.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(career.endDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {career.description}</p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {portfolio.skills.map((skill) => (
        <div key={skill.id} className="mb-4">
          <p><strong>Name:</strong> {skill.name}</p>
          <p><strong>Proficiency:</strong> {skill.proficiency}</p>
          <p><strong>Years of Experience:</strong> {skill.yearsOfExperience}</p>
          <p><strong>Learning Source:</strong> {skill.learningSource}</p>
          <p><strong>Last Used:</strong> {skill.lastUsed}</p>
          <p><strong>Endorsements:</strong> {skill.endorsements}</p>
          <p><strong>Category:</strong> {skill.category}</p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      {portfolio.certifications.map((certification) => (
        <div key={certification.id} className="mb-4">
          <p><strong>Name:</strong> {certification.name}</p>
          <p><strong>Issuing Organization:</strong> {certification.issuingOrganization}</p>
          <p><strong>Issued Date:</strong> {new Date(certification.issuedDate).toLocaleDateString()}</p>
          <p><strong>Expiration Date:</strong> {new Date(certification.expirationDate).toLocaleDateString()}</p>
          <p><strong>Credential ID:</strong> {certification.credentialId}</p>
          <p><strong>Photo URL:</strong> <a href={certification.photoUrl} className="text-blue-500">{certification.photoUrl}</a></p>
        </div>
      ))}

      <Link href="/dashboard/student/dashboard" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Portfolio List
      </Link>
    </div>
    </div>
    </>
  );
};

export default PortfolioDetails;
