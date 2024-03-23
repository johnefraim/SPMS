'use client'
import { StudentNavigation } from "@/components/mycomponents/studentdashboard/studentnavigation";
import {  useLayoutEffect, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { DeanOverview } from "@/components/mycomponents/deandashboard/deanOverview";
import {DeanSidebar} from "@/components/mycomponents/deandashboard/deanSidebar";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
export default function DeanDashboard(){

    const [currentComponent, setCurrentComponent] = useState('dean-overview');

    const renderComponent = () => {
        switch (currentComponent) {
            case 'dean-overview':
                return <DeanOverview  />;
            default:
                return <DeanOverview />;    
            
        }
    };

    useLayoutEffect(() => {
        const datatoken = localStorage.getItem('token');
      if (datatoken === null) {
        redirect('/');
      }
      }, [])

    const userRole = localStorage.getItem('role');
    
    useEffect(() => {
        if(userRole !== 'ADMIN' && userRole === 'STUDENT'){
            redirect('/dashboard/student');
        }else if(userRole !== 'ADMIN' && userRole === 'MANAGER'){
            redirect('/dashboard/program-head');
        }
    }, [userRole])

    return(
        <>
            <section className="flex">
                <DeanSidebar onDeanOverview={()=>setCurrentComponent('dean-overview')}
                                onProfile={()=> setCurrentComponent('studentprofile')} />
            <div className="h-lvh flex  w-full">
                <div className="w-full flex-row-3">{renderComponent()}</div>
                <div className="grid justify-end p-4">
                        <LogoutDropDown/>
                </div>
            </div>
            </section>
        </>
    );
}