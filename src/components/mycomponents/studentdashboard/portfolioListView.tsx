import { getMyPortfolios } from '@/app/api/createportfolio';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';

interface Portfolio {
  id: number;
  portfolioTitle: string;
  description: string;
  category: string;
  tagsKeywords: string;
}

const PortfolioListView = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.Id;
          const response = await getMyPortfolios(userId.toString());
          setPortfolios(response.data);
          setRefresh(true);
        } catch (error) {
          console.error('Error fetching portfolios:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPortfolios();
  }, [refresh]);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Portfolios</h1>
      {isLoading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {portfolios.map((portfolio) => (
              <tr key={portfolio.id}>
                <td className="px-6 py-4 whitespace-nowrap">{portfolio.portfolioTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{portfolio.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  
};

export default PortfolioListView;
