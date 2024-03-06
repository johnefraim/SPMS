import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoginForm } from './logincomponents/loginform';
import { KeyRound } from "lucide-react";
interface SectionPageProps {
  h1tag?: string;
  
}

const SectionPage: React.FC<SectionPageProps> = ({  h1tag }) => {
  return (
    <section className="h-lvh flex justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 w-1/2 ml-16">{h1tag}</h1>
      <div className="flex justify-center items-center w-1/2">
      <Card className="flex-2 w-64 bg-stone-100">
        <CardTitle className="flex font-semibold text-orange-500 mt-4 ml-6 tranpa">Sign In <KeyRound size={20} className="flex" /></CardTitle>
          <CardContent className="flex">
              <LoginForm />
          </CardContent>
      </Card>
      </div>
    </section>
  );
}

export default SectionPage;
