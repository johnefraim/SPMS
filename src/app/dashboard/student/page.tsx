'use client';

import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/home/student-overview";
import { useEffect, useState, useLayoutEffect } from "react";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
import { useRouter } from 'next/navigation';
import ProfileDisplay from "@/components/mycomponents/studentdashboard/profile/profileDisplay";
import PortfolioCRUD from "@/components/mycomponents/studentdashboard/portfolio/portfolioCrud";

export default function StudentDashboard() {
    const [currentComponent, setCurrentComponent] = useState<string>('overview');
    const router = useRouter();

    useLayoutEffect(() => {
        const datatoken = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
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
        const datatoken = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
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
        <>
            <section className="flex h-screen bg-[#EFEFEF]">
                <div>
                    <StudentSidebar
                        onDashboard={() => setCurrentComponent('overview')}
                        onProfile={() => setCurrentComponent('profile')}
                        onCreatePortfolio={() => setCurrentComponent('createPortfolio')}
                    />
                </div>
                <div className="w-full flex flex-col mt-16">
                    {renderComponent()}
                </div>
                <div className="grid justify-end p-4">
                    <LogoutDropDown />
                </div>
            </section>
        </>
    );
}
