'use client'
import React, { useEffect } from 'react';

const PortfolioPage = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const scrollListener = () => {
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top >= 0 && top <= window.innerHeight) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="container mx-auto px-4">
  <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
  <div className="flex justify-center items-center mb-12">
    <img
      src="/profile-pic.jpg" 
      alt="Profile Picture"
      className="rounded-full w-48 h-48 mx-auto mb-6"
    />
  </div>
  <div className="max-w-2xl mx-auto text-lg leading-8">
    <p className="mb-6">
      Hi there! Im John Doe, a passionate web developer with over 5 years of experience in building modern and user-friendly web applications. I have a strong background in both front-end and back-end development, with expertise in technologies such as React.js, Node.js, and MongoDB.
    </p>
    <p className="mb-6">
      My mission is to create elegant and functional solutions that not only meet the needs of clients but also provide an exceptional user experience. I am dedicated to continuous learning and improvement, always staying up-to-date with the latest trends and technologies in the industry.
    </p>
    <p className="mb-6">
      Outside of coding, I enjoy spending time with my family, exploring new hiking trails, and playing the guitar. I believe in maintaining a healthy work-life balance to ensure creativity and productivity.
    </p>
  </div>
</div>


      </section>
      <section className="h-screen flex justify-center items-center bg-gray-200">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Education</h2>
            <p className="text-lg leading-7 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              ullamcorper libero eget mauris suscipit, ac rutrum nulla laoreet.
              Vivamus eu velit felis.
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen flex justify-center items-center bg-gray-300">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc pl-5">
              <li className="text-lg leading-7">Skill 1</li>
              <li className="text-lg leading-7">Skill 2</li>
              <li className="text-lg leading-7">Skill 3</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="h-screen flex justify-center items-center bg-gray-400">
        <div className="container mx-auto px-4">
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
      </section>
    </div>
  );
};

export default PortfolioPage;
