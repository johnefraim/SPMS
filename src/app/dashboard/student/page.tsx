'use client'
import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentNavigation } from "@/components/mycomponents/studentdashboard/studentnavigation";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/dashboard/student-overview";
import {  useEffect, useState, useLayoutEffect } from "react";
import { CreatePortfolio } from "@/components/mycomponents/studentdashboard/portfolio/createportfolio";
import AcademicDetailsForm from "@/components/mycomponents/studentdashboard/academicdetails/academicDetails";
import ProjectComponent from "@/components/mycomponents/studentdashboard/projects/projectComponent";
import ExperienceComponent from "@/components/mycomponents/studentdashboard/experience/experienceComponent";
import CertificateComponent from "@/components/mycomponents/studentdashboard/certificate/certificateComponent";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
import { redirect } from "next/navigation"
import ProfileDisplay from "@/components/mycomponents/studentdashboard/profile/profileDisplay";
//import { LogoutDropDown } from "../../mycomponents/studentdashboard/logoutdropdown";
export default function StudentDashboard(){

    const [currentComponent, setCurrentComponent] = useState('');
    const userRole = localStorage.getItem('role');
    const renderComponent = () => {
        switch (currentComponent) {
            case 'overview':
                return <StudentOverview />;
            case 'profile':
                return <ProfileDisplay/>;
            case 'createPortfolio':
                return <CreatePortfolio />;
            case 'academicDetails':
                return <AcademicDetailsForm />;
            case 'project':
                return <ProjectComponent />;
            case 'workExperience':
                return <ExperienceComponent />;
            case 'certificate':
                return <CertificateComponent />;
            default:
                return <StudentOverview />;
        }
    };
    
    useLayoutEffect(() => {
        const datatoken = localStorage.getItem('token')
      if (datatoken === null && userRole === null) {
        redirect('/');
      }
      }, [])

    
    useEffect(() => {
        
        if(userRole !== 'STUDENT' && userRole === 'ADMIN'){
            redirect('/dashboard/dean');
        }else if(userRole !== 'STUDENT' && userRole === 'MANAGER'){
            redirect('/dashboard/program-head');
        }
        
    }, [userRole])  
    return(
        <>
            <section className="flex h-screen bg=[#EFEFEF]">
                <div>
                    <StudentSidebar 
                    onDashboard={()=>setCurrentComponent('overview')}
                    onProfile={()=> setCurrentComponent('profile')}
                    onCreatePortfolio={()=>setCurrentComponent('createPortfolio')}
                    onAcademicDetails={()=>setCurrentComponent('academicDetails')}
                    onProject={()=>setCurrentComponent('project')}
                    onWorkExperience={()=>setCurrentComponent('workExperience')}
                    onCertificate={()=>setCurrentComponent('certificate')}
                />
                </div>
                <div className="w-full flex-row-3 mt-16">{renderComponent()}</div>
                <div className="grid justify-end p-4">
                    <LogoutDropDown/>
                </div>
            </section>
        </>
    );
}