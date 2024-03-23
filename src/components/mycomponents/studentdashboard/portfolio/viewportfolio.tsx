import React from 'react';

const PortfolioPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="/profile-pic.jpg"
            alt="Profile Picture"
            className="rounded-full w-48 h-48 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold mb-2">About Me</h2>
          <p className="text-lg leading-7 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ullamcorper libero eget mauris suscipit, ac rutrum nulla laoreet.
            Vivamus eu velit felis.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <p className="text-lg leading-7 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ullamcorper libero eget mauris suscipit, ac rutrum nulla laoreet.
            Vivamus eu velit felis.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">
            <li className="text-lg leading-7">Skill 1</li>
            <li className="text-lg leading-7">Skill 2</li>
            <li className="text-lg leading-7">Skill 3</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Project 1</h3>
              <p className="text-base leading-7">
                Description of Project 1. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Project 2</h3>
              <p className="text-base leading-7">
                Description of Project 2. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
