"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import { DeanOverview } from "@/components/mycomponents/deandashboard/deanOverview";
import { DeanSidebar } from "@/components/mycomponents/deandashboard/deanSidebar";
import { LogoutDropDown } from "@/components/mycomponents/studentdashboard/logoutdropdown";
import SearchBar from "@/components/mycomponents/deandashboard/searchbar";
import StudentList from "@/components/mycomponents/deandashboard/studentList";
import { authenticated, getRole } from "@/app/api/authService";
import { redirect } from "next/navigation";

interface Student {
    name: string;
    skills: string[];
}

export default function DeanDashboard() {
    const [currentComponent, setCurrentComponent] = useState('dean-overview');
    const [searchResults, setSearchResults] = useState<Student[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const renderComponent = () => {
        switch (currentComponent) {
            case 'dean-overview':
                return <DeanOverview />;
            case 'search-result':
                return <StudentList students={students} />;
            default:
                return <DeanOverview />;
        }
    };

    useLayoutEffect(() => {
        const auth = authenticated();
        if (!auth) {
            redirect('/');
        }
    }, []);

    useEffect(() => {
        
            const userRole = getRole();
                if (userRole !== 'ADMIN') {
                switch (userRole) {
                    case 'STUDENT':
                        redirect('/dashboard/student');
                    case 'MANAGER':
                        redirect('/dashboard/program-head');
                default:
                    redirect('/');
            }
          }
        
    }, []);

    return (
        <section className="flex">
            <DeanSidebar
                onDeanOverview={() => setCurrentComponent('dean-overview')}
                onProfile={() => setCurrentComponent('studentprofile')}
            />
            <div className="flex">
            
            </div>
            <div className="h-screen flex w-full">
                <div className="w-full">{renderComponent()}</div>
                <div className="grid justify-end p-4">
                    <LogoutDropDown />
                </div>
            </div>
        </section>
    );
}
