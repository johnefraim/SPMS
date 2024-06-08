'use client'
import useStore from '@/lib/store'
import Link from "next/link";
import { LucideLink } from "lucide-react";
import { useEffect } from 'react';

interface Portfolio {
  id?: number;
  portfolioTitle: string;
  category: string;
  description: string;
  tagsKeywords: string;
}

const PortfolioList: React.FC = () => {
  const { fetchPortfolios, portfolios } = useStore();

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Portfolio List</h1>
      <ul className="flex flex-wrap justify-center">
        {portfolios && portfolios.map((portfolio: Portfolio) => (
          <li key={portfolio.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{portfolio.portfolioTitle}</h2>
              <p className="text-gray-700 mb-4">{portfolio.description}</p>
              <p className="text-gray-500 mb-2">{portfolio.category}</p>
              <p className="text-gray-500 mb-4">{portfolio.tagsKeywords}</p>
              <Link href={`/portfolios/${portfolio.id}`} className="text-orange-600 hover:text-orange-800 flex items-center">
                <LucideLink className="mr-2" />
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfolioList;
