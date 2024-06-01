import { getName } from '@/app/api/authService';
import React, { useEffect, useState } from 'react';

export function StudentOverview() {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = getName();
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <section className="flex flex-col items-start justify-normal min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="mt-12 ml-2">
        <h1 className="text-6xl leading-tight font-bold text-gray-900">
          Welcome, {name}!
        </h1>
      </div>
      <div className="mt-8 max-w-prose ml-2">
        <p className="text-xl leading-relaxed text-gray-700">
          Explore your dashboard, manage your portfolio, and track your progress as you prepare for graduation. We&apos;re excited to have you back and ready to support you on your journey.
        </p>
      </div>
    </section>
  );
}
