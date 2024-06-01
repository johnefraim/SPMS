import React, { useEffect, useState } from 'react';
import { getName } from '@/app/api/authService';

export function StudentOverview() {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = getName();
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Welcome, {name}!
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700">
          Explore your dashboard, manage your portfolio, and track your progress as you prepare for graduation. We&apos;re excited to have you back and ready to support you on your journey.
        </p>
      </div>
      <div className="mt-12">
        {/* <img src="/hero-image.jpg" alt="Hero Image" className="rounded-lg shadow-lg" /> */}
      </div>
      <div className="mt-12 max-w-3xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Project 1</h3>
            <p className="text-gray-700">Description of Project 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
      
        </div>
      </div>
    </section>
  );
}
