'use client'
import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentNavigation } from "@/components/mycomponents/studentdashboard/studentnavigation";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/student-overview";
import {  useLayoutEffect, useState } from "react";
import EditProfile from "@/components/mycomponents/studentdashboard/editprofile";
import { CreatePortfolio } from "@/components/mycomponents/studentdashboard/createportfolio";
import { redirect } from "next/navigation";

export default function StudentDashboard(){

    const [currentComponent, setCurrentComponent] = useState('overview');
    const renderComponent = () => {
        switch (currentComponent) {
            case 'overview':
                return <StudentOverview />;
            case 'editProfile':
                return <EditProfile />;
            case 'createPortfolio':
                return <CreatePortfolio />;
            default:
                return <StudentOverview />;
        }
    };

    useLayoutEffect(() => {
        const datatoken = localStorage.getItem('token');
      if (datatoken === null) {
        redirect('/login');
      }
      }, [])

    return(
        <>
            <header>
                <StudentNavigation/>
            </header>
            <section className="h-lvh flex">
                <div>
                    WElCOME DEAN!
                </div>
                <div className="w-full flex-row-3">{renderComponent()}</div>
            </section>
        </>
    );
}