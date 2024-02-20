
'use client'

import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentNavigation } from "@/components/mycomponents/studentdashboard/studentnavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/student-overview";
import { useState } from "react";
import EditProfile from "@/components/mycomponents/studentdashboard/editprofile";
import { CreatePortfolio } from "@/components/mycomponents/studentdashboard/createportfolio";
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

    return(
        <>
            <header>
                <StudentNavigation/>
            </header>
            <section className="bg-slate-300 h-full flex">
                <div><StudentSidebar 
                    onDashboard={()=>setCurrentComponent('overview')}
                    onEditProfile={()=> setCurrentComponent('editProfile')}
                    onECreatePortfolio={()=>setCurrentComponent('createPortfolio')}
                /></div>
                <div className="w-full flex-row-3">{renderComponent()}</div>

            </section>
        </>
    );
}