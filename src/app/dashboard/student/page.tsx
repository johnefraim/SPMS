'use client'
import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/dashboard/student-overview";
import {  useEffect, useState, useLayoutEffect } from "react";
import { CreatePortfolio } from "@/components/mycomponents/studentdashboard/portfolio/createportfolio";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
import { redirect } from "next/navigation"
import ProfileDisplay from "@/components/mycomponents/studentdashboard/profile/profileDisplay";
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