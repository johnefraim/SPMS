import { deletePortfolio, getMyPortfolios } from '@/app/api/portfolioService';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EditDialog } from './editDialog';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import  PortfolioConfig from './portfolioInputComponent/portfolioConfig';
import Link from 'next/link';
import axios from 'axios';
import { getToken } from '@/app/api/authService';


interface refreshtype {
  refreshList: boolean;
}

interface Portfolio {
  id: number;
  portfolioTitle: string;
  description: string;
  category: string;
  tagsKeywords: string;
}

const PortfolioListView = ({refreshList}: refreshtype) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = getToken();
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
  }, [refreshList, refresh]);

  const refreshPortfolioList = () => {
    setRefresh(!refresh);
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Portfolios</h1>
      {isLoading && <p>Loading...</p>}
      <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Title</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Description</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {portfolios.map((portfolio) => (

          <tr key={portfolio.id}>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{portfolio.portfolioTitle}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{portfolio.description}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3 space-x-2 ">
            <div className='flex w-12'>
            </div>
            <Link href="/dashboard/student/portfolio">
                <Button size={'sm'}>Preview</Button>
              </Link>
              <PortfolioConfig portfolioAttribute={portfolio.id}/>
              <EditDialog portfolio={portfolio} refreshPortfolioList={refreshPortfolioList} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'destructive'}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>Delete Portfolio</AlertDialogHeader>
                  <AlertDialogDescription>Are you sure you want to delete this portfolio?</AlertDialogDescription>
                  <div className="flex justify-end space-x-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={'destructive'}  onClick={async () => {
                        const response = await axios.delete(`http://localhost:8080/api/portfolio/delete/${portfolio.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${getToken()}`,
                            },
                          }
                        );
                        if (response.status === 200) {
                          setRefresh(!refresh);
                          console.error('Response Data:', response.data);
                        }
                      else {
                        console.error('Delete request failed:', response.data);
                      }
                      
                      }}>Delete</Button>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
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
