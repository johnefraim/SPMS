import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import MacBrowserWindow from './macwindow';

interface SectionPageProps {
  h1tag?: string;
  
}

const SectionPage: React.FC<SectionPageProps> = ({  h1tag }) => {
  return (
    <section className="h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold mb-4 text-black w-1/2">{h1tag}</h1>
      <div className="flex justify-center items-center mr-12">
          <MacBrowserWindow/>
      </div>
    </section>
  );
}

export default SectionPage;
