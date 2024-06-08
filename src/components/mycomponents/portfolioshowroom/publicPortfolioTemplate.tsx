'use client'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import {Briefcase,Code,  
  ExternalLink,
   GraduationCap, 
   School, 
   Calendar, 
   BookOpen, 
   Star, 
   Clipboard,
   Link2,
   Clock,
   Award,
   } from 'lucide-react';
import { User, Globe, MapPin } from 'lucide-react';

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

interface Params {
  id: string;
}

const PublicPortfolioDetails: React.FC<Params> = ({ id }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      axios.get(`${apiUrl}/public/portfolio/${id}`)
        .then((response) => {
          setPortfolio(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error('Error fetching portfolio:', error));
    }
  }, [id, apiUrl]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md" ref={componentRef}>
      <div className="flex items-center mb-6">
    <div>
      <h1 className="text-3xl font-bold">{portfolio.portfolioTitle}</h1>
      <p className="text-lg">{portfolio.description}</p>
    </div>
  </div>

        <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <User className="mr-2" />
      Personal Details
    </h2>
    {portfolio.personalDetails && portfolio.personalDetails.map((detail) => (
      <div key={detail.id} className="mb-4 p-6 border rounded-lg shadow-md bg-white">
        <ul className="space-y-2">
          <li className="flex items-center">
            <ExternalLink className="mr-2 text-blue-500" />
            <span><strong>LinkedIn:</strong> <a href={detail.linkedin} className="text-blue-500" target="_blank" rel="noopener noreferrer">{detail.linkedin}</a></span>
          </li>
          <li className="flex items-center">
            <ExternalLink className="mr-2 text-blue-500" />
            <span><strong>Social Media:</strong> <a href={detail.socialMedia} className="text-blue-500" target="_blank" rel="noopener noreferrer">{detail.socialMedia}</a></span>
          </li>
          <li className="flex items-center">
            <Globe className="mr-2 text-blue-500" />
            <span><strong>Website:</strong> <a href={`http://${detail.website}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">{detail.website}</a></span>
          </li>
          <li className="flex items-center">
            <MapPin className="mr-2 text-blue-500" />
            <span><strong>Address:</strong> {detail.address}</span>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>Date of Birth:</strong> {new Date(detail.dob).toLocaleDateString()}</span>
          </li>
        </ul>
      </div>
    ))}
  </section>

        <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <GraduationCap className="mr-2" />
      Educational Background
    </h2>
    {portfolio.educationalBackground && portfolio.educationalBackground.map((education) => (
      <div key={education.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <ul className="space-y-2">
          <li className="flex items-center">
            <School className="mr-2 text-indigo-500" />
            <span><strong>School:</strong> {education.school}</span>
          </li>
          <li className="flex items-center">
            <BookOpen className="mr-2 text-green-500" />
            <span><strong>Degree:</strong> {education.degree}</span>
          </li>
          <li className="flex items-center">
            <Clipboard className="mr-2 text-yellow-500" />
            <span><strong>Field of Study:</strong> {education.fieldOfStudy}</span>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>Start Date:</strong> {new Date(education.startDate).toLocaleDateString()}</span>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>End Date:</strong> {new Date(education.endDate).toLocaleDateString()}</span>
          </li>
          <li className="flex items-center">
            <Star className="mr-2 text-red-500" />
            <span><strong>GPA:</strong> {education.gpa}</span>
          </li>
          <li className="flex items-center">
            <Clipboard className="mr-2 text-purple-500" />
            <span><strong>Activities:</strong> {education.activities}</span>
          </li>
          <li className="flex items-center">
            <Clipboard className="mr-2 text-purple-500" />
            <span><strong>Description:</strong> {education.description}</span>
          </li>
        </ul>
      </div>
    ))}
  </section>

  <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <Code className="mr-2" />
      Projects
    </h2>
    {portfolio.projectEntity && portfolio.projectEntity.map((project) => (
      <div key={project.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <div className="mb-2">
          <Image unoptimized height={128} width={128} src={project.projectImage} alt={project.projectTitle} className="w-full h-48 object-cover mb-2" />
        </div>
        <ul className="space-y-2">
          <li>
            <p className="text-lg font-semibold"><strong>Project Title:</strong> {project.projectTitle}</p>
          </li>
          <li>
            <p><strong>Description:</strong> {project.description}</p>
          </li>
          <li>
            <p><strong>Role:</strong> {project.role}</p>
          </li>
          <li>
            <p><strong>Technologies:</strong> {project.technologies}</p>
          </li>
          <li>
            <ExternalLink className="mr-2 text-blue-500" />
            <span><strong>Project Link:</strong> <a href={project.projectLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{project.projectLink}</a></span>
          </li>
          <li>
            <ExternalLink className="mr-2 text-blue-500" />
            <span><strong>Project Github:</strong> <a href={project.projectGithub} className="text-blue-500" target="_blank" rel="noopener noreferrer">{project.projectGithub}</a></span>
          </li>
        </ul>
      </div>
    ))}
  </section>

  <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <Briefcase className="mr-2" />
      Career
    </h2>
    {portfolio.careerEntity && portfolio.careerEntity.map((career) => (
      <div key={career.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <ul className="space-y-2">
          <li className="flex items-center">
            <p className="text-lg font-semibold"><strong>Job Title:</strong> {career.jobTitle}</p>
          </li>
          <li className="flex items-center">
            <p><strong>Employment Type:</strong> {career.employmentType}</p>
          </li>
          <li className="flex items-center">
            <p><strong>Company:</strong> {career.company}</p>
          </li>
          <li className="flex items-center">
            <MapPin className="mr-2 text-blue-500" />
            <span><strong>Location:</strong> {career.location}</span>
          </li>
          <li className="flex items-center">
            <p><strong>Location Type:</strong> {career.locationType}</p>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>Start Date:</strong> {new Date(career.startDate).toLocaleDateString()}</span>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>End Date:</strong> {new Date(career.endDate).toLocaleDateString()}</span>
          </li>
          <li>
            <p><strong>Description:</strong> {career.description}</p>
          </li>
        </ul>
      </div>
    ))}
  </section>

  <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <Star className="mr-2" />
      Skills
    </h2>
    {portfolio.skills && portfolio.skills.map((skill) => (
      <div key={skill.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <ul className="space-y-2">
          <li className="flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            <span><strong>Name:</strong> {skill.name}</span>
          </li>
          <li className="flex items-center">
            <Star className="mr-2 text-yellow-500" />
            <span><strong>Proficiency:</strong> {skill.proficiency}</span>
          </li>
          <li className="flex items-center">
            <Clock className="mr-2 text-green-500" />
            <span><strong>Years of Experience:</strong> {skill.yearsOfExperience}</span>
          </li>
          <li className="flex items-center">
            <MapPin className="mr-2 text-purple-500" />
            <span><strong>Learning Source:</strong> {skill.learningSource}</span>
          </li>
          <li className="flex items-center">
            <Clock className="mr-2 text-green-500" />
            <span><strong>Last Used:</strong> {skill.lastUsed}</span>
          </li>
          <li className="flex items-center">
            <Link2 className="mr-2 text-blue-500" />
            <span><strong>Endorsements:</strong> {skill.endorsements}</span>
          </li>
          <li className="flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            <span><strong>Category:</strong> {skill.category}</span>
          </li>
        </ul>
      </div>
    ))}
  </section>

  <section className="mb-8">
    <h2 className="text-3xl font-bold mb-4 flex items-center">
      <Award className="mr-2" />
      Certifications
    </h2>
    {portfolio.certifications && portfolio.certifications.map((certification) => (
      <div key={certification.id} className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <ul className="space-y-2">
          <li className="flex items-center">
            <p className="text-lg font-semibold"><strong>Name:</strong> {certification.name}</p>
          </li>
          <li className="flex items-center">
            <p><strong>Issuing Organization:</strong> {certification.issuingOrganization}</p>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>Issued Date:</strong> {new Date(certification.issuedDate).toLocaleDateString()}</span>
          </li>
          <li className="flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            <span><strong>Expiration Date:</strong> {new Date(certification.expirationDate).toLocaleDateString()}</span>
          </li>
          <li className="flex items-center">
            <p><strong>Credential ID:</strong> {certification.credentialId}</p>
          </li>
          <li className="flex items-center">
            <ExternalLink className="mr-2 text-blue-500" />
            <span><strong>Photo URL:</strong> <a href={certification.photoUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">{certification.photoUrl}</a></span>
          </li>
        </ul>
      </div>
      ))}
      </section>
      </div>
        <Link href={`/dashboard/student`} className=" first-line:bg-blue-500 text-white px-4 py-2 rounded">
            <button className="no-print bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        </Link>
        <button onClick={handlePrint} className="no-print bg-blue-500 text-white px-4 py-2 rounded mb-4">Download as PDF</button>
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default PublicPortfolioDetails;
