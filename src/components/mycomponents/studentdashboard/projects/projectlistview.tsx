import { deletePortfolio, getMyPortfolios } from '@/app/api/portfolioService';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
// import { EditProjectDialog } from './editprojectdialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface refreshtype {
  refreshList: boolean;
}

interface Project {
    Id: number;
    projectImage: string;
    projectTitle: string;
    description: string;
    Role: string;
    technologies: string;
    projectLink: string;
    projectGithub: string;
  }

const ProjectListView = ({refreshList}: refreshtype) => {
  const [projects, setPortfolios] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //         const userId = decodedToken.Id;
  //         //const response = await getMyProject(userId.toString());
  //         setPortfolios(response.data);
  //         setRefresh(true);
  //       } catch (error) {
  //         console.error('Error fetching portfolios:', error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchProjects();
  // }, [refreshList, refresh]);

  const refreshPortfolioList = () => {
    setRefresh(!refresh);
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Project</h1>
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
        {projects.map((Project) => (

          <tr key={Project.Id}>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{Project.Id}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{Project.projectTitle}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3 space-x-2">
              
              {/* <EditProjectDialog project={Project} refreshPortfolioList={refreshPortfolioList} /> */}
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
                        const response = await deletePortfolio(`${Project.Id}`);
                        if (response.status === 200) {
                          setRefresh(!refresh);
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

export default ProjectListView;
