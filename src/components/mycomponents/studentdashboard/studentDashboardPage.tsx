"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/home/student-overview";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
import ProfileDisplay from "@/components/mycomponents/studentdashboard/profile/profileDisplay";
import PortfolioCRUD from "@/components/mycomponents/studentdashboard/portfolio/portfolioCrud";
import { authenticated, getRole, getToken } from "@/app/api/authService";

const StudentDashboardPage = () => {
    const [currentComponent, setCurrentComponent] = useState<string>('overview');
    const router = useRouter();

    useLayoutEffect(() => {
        
        const userRole = getRole();
        const datatoken = authenticated();
        
        if (!datatoken || !userRole) {
            router.replace('/');
            return;
        }

        if (userRole !== 'STUDENT') {
            switch (userRole) {
                case 'ADMIN':
                    router.replace('/dashboard/dean');
                    break;
                case 'MANAGER':
                    router.replace('/dashboard/program-head');
                    break;
                default:
                    router.replace('/');
                    break;
            }
        }
    }, [router]);

    useEffect(() => {
        const datatoken = getToken;
        const userRole = getRole();
        
        if (!datatoken || !userRole) {
            router.replace('/');
            return;
        }

        if (userRole !== 'STUDENT') {
            switch (userRole) {
                case 'ADMIN':
                    router.replace('/dashboard/dean');
                    break;
                case 'MANAGER':
                    router.replace('/dashboard/program-head');
                    break;
                default:
                    router.replace('/');
                    break;
            }
        }
    }, [router]);

    const renderComponent = () => {
        switch (currentComponent) {
            case 'overview':
                return <StudentOverview />;
            case 'profile':
                return <ProfileDisplay />;
            case 'createPortfolio':
                return <PortfolioCRUD />;
            default:
                return <StudentOverview />;
        }
    };

    return (
        <section className="flex h-screen bg-[#EFEFEF]">
            <div>
                <StudentSidebar
                    onDashboard={() => setCurrentComponent('overview')}
                    onProfile={() => setCurrentComponent('profile')}
                    onCreatePortfolio={() => setCurrentComponent('createPortfolio')}
                />
            </div>
            <div className="w-full flex flex-col">
                {renderComponent()}
            </div>
            <div className="grid justify-end p-4">
                <LogoutDropDown />
            </div>
        </section>
    );
}

export default StudentDashboardPage;