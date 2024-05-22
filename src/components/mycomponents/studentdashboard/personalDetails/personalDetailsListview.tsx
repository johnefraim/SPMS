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
import { EditPersonalDetailsDialog } from "./editPersonalDetails";
import PersonalDetails from "../portfolio/portfolioInputComponent/personalDetails";
import { GetPersonalDetails } from "@/app/api/personalDetailService";

interface refresh{
    refreshlist?: boolean,
}

interface PersonalDetails{
    id: string,
    linkedin: string,
    socialMedia: string,
    website: string,
    address:string,
    dob: string,
}

export function PersonalDetailsListview({refreshlist}: refresh){
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    // useEffect(() => {
    //   const fetchPersonalDetails = async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //       try {
    //         const decodedToken = JSON.parse(atob(token.split('.')[1]));
    //         const userId = decodedToken.Id;
    //         const response = await GetPersonalDetails(userId.toString());
    //         console.log(response.data);
    //         setPersonalDetails(response.data);
    //         setRefresh(true);
    //       } catch (error) {
    //         console.error('Error fetching portfolios:', error);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     }
    //   };
  
    //   fetchPersonalDetails();
    // }, [refreshlist, refresh]);
  
    const refreshAcademicList = () => {
      setRefresh(!refresh);
    }
    return(
        <>
      <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Details</h1>
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
        {personalDetails.map((personalDetails) => (

          <tr key={personalDetails.id}>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{personalDetails.linkedin}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3">{personalDetails.address}</td>
            <td className="px-6 py-4 whitespace-nowrap w-1/3 space-x-2 ">
            <div className='flex w-12'>
            </div>
                <EditPersonalDetailsDialog refreshAcademicList={refreshAcademicList} personalDetails={personalDetails}/>
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
                      const response = await DeleteAcademicDetails(`${personalDetails.id}`);
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