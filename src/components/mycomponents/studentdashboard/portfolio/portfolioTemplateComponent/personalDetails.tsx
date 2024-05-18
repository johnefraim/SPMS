import React from 'react';

interface PersonalDetailsProps {
  photoUrl: string;
  name: string;
  bio: string;
  email: string;
  phone: string;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ photoUrl, name, bio, email, phone }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center">
          <img
            src="https://picsum.photos/200/300" 
            alt="Profile Picture"
            className="w-24 h-24 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Jenny S.</h1>
              <p className="text-gray-600">Designer at Google</p>
              <p className="text-gray-600">San Francisco, CA</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full">Hire me</button>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="mt-2 text-gray-700">
              I’m a designer with a passion for creating intuitive and engaging user experiences.
              I have a strong foundation in design principles, and have experience working with a
              variety of design tools. My work is driven by my desire to create beautiful and
              functional designs that solve real problems.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap mt-2">
              {['UI/UX Design', 'Wireframing', 'Prototyping', 'Sketch', 'Figma'].map(skill => (
                <span key={skill} className="px-3 py-1 mr-2 mt-2 bg-gray-200 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            {[
              { company: 'Google', location: 'San Francisco, CA', period: 'Aug 2020 - Present' },
              { company: 'Facebook', location: 'San Francisco, CA', period: 'Jul 2018 - Aug 2020' },
              { company: 'LinkedIn', location: 'San Francisco, CA', period: 'Jan 2016 - Jun 2018' }
            ].map(job => (
              <div key={job.company} className="mt-4">
                <h3 className="text-lg font-medium">{job.company}</h3>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-600">{job.period}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Education</h2>
            <div className="mt-4">
              <h3 className="text-lg font-medium">University of Texas at Austin</h3>
              <p className="text-gray-600">Austin, TX</p>
              <p className="text-gray-600">Aug 2012 - May 2016</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Certifications</h2>
            {[
              { title: 'User Experience Design', issuer: 'Interaction Design Foundation', date: 'Issued Jan 2021' },
              { title: 'UI / UX Design Specialization', issuer: 'Coursera', date: 'Issued Jun 2021' }
            ].map(cert => (
              <div key={cert.title} className="mt-4">
                <h3 className="text-lg font-medium">{cert.title}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-gray-600">{cert.date}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            {[
              { title: 'Mobile App Redesign', date: 'Sep 2021' },
              { title: 'E-commerce Website', date: 'Nov 2020' },
              { title: 'Dashboard Design', date: 'Oct 2021' },
              { title: 'Landing Page', date: 'Sep 2021' }
            ].map(project => (
              <div key={project.title} className="mt-4">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <p className="text-gray-600">{project.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
