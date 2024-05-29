import Image from "next/image";
import React from "react";

interface HomeProps {
  photoUrl: string;
  name: string;
  bio: string;
}

const Home: React.FC<HomeProps> = ({ photoUrl, name, bio }) => {
  return (
    <section className="bg-gray-100 p-8 rounded-lg h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6">Welcome to My Portfolio</h1>
      <Image height={128} width={128} src={photoUrl} alt={name} className="w-40 h-40 rounded-full mb-4 object-cover shadow-lg"/>
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <p className="text-lg text-gray-700 text-center max-w-lg">{bio}</p>
    </section>
  );
};

export default Home;
