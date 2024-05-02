import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
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
import { DeleteAcademicDetails, GetAcademicDetails } from "@/app/api/academicService";
import { EditAcademicDialog } from "./editAcademicDialog";

interface refresh{
    refreshlist: boolean,
}

interface AcademicDetail{
    id: string,
    school: string,
    degree: string,
    fieldOfStudy: string,
    startDate: string,
    endDate: string,
    gpa: number,
    activities: string,
    description: string,
}

export function AcademicListview({refreshlist}: refresh){
    const [academicDetails, setacademicDetails] = useState<AcademicDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fetchAcademicDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.Id;
            const response = await GetAcademicDetails(userId.toString());
            console.log(response.data);
            setacademicDetails(response.data);
            setRefresh(true);
          } catch (error) {
            console.error('Error fetching portfolios:', error);
          } finally {
            setIsLoading(false);
          }
        }
      };
  
      fetchAcademicDetails();
    }, [refreshlist, refresh]);
  
    const refreshAcademicList = () => {
      setRefresh(!refresh);
    }
    return(
        <>
      <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Academic Details</h1>
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
        {academicDetails.map((academicDetails) => (

          <tr key={academicDetails.id}>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{academicDetails.school}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{academicDetails.fieldOfStudy}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3 space-x-2 ">
            <div className='flex w-12'>
            </div>
              <EditAcademicDialog academicdetail={academicDetails} refreshAcademicList={refreshAcademicList}/>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'destructive'}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>Delete Portfolio</AlertDialogHeader>
                  <AlertDialogDescription>Are you sure you want to delete this Details?</AlertDialogDescription>
                  <div className="flex justify-end space-x-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={'destructive'}  onClick={async () => {
                      const response = await DeleteAcademicDetails(`${academicDetails.id}`);
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
        </>
    );
}