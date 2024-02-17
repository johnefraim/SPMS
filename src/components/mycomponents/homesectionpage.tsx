import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
interface SectionPageProps {
  h1tag?: string;
  
}

const SectionPage: React.FC<SectionPageProps> = ({  h1tag }) => {
  return (
    <section className="h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold mb-4 text-orange-500">{h1tag}</h1>
      <div className="flex justify-center items-center mr-12">
              <div>
              <Image
              src="/model-1.png"
              alt="model-1 logo"
              width={350}
              height={100}
              />
              </div>
              <div>
              <Image
              src="/model-2.png"
              alt="model-2 logo"
              width={350}
              height={100}
              />
              </div>
          </div>
    </section>
  );
}

export default SectionPage;
