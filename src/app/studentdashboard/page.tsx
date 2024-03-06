'use client'
import { StudentSidebar } from "@/components/mycomponents/studentdashboard/studentsidebar";
import { StudentNavigation } from "@/components/mycomponents/studentdashboard/studentnavigation";
import { StudentOverview } from "@/components/mycomponents/studentdashboard/dashboard/student-overview";
import {  useState } from "react";
import EditProfile from "@/components/mycomponents/studentdashboard/profile/editprofile";
import { CreatePortfolio } from "@/components/mycomponents/studentdashboard/portfolio/createportfolio";
import AcademicDetailsForm from "@/components/mycomponents/studentdashboard/academicdetails/academicDetails";
import ProjectComponent from "@/components/mycomponents/studentdashboard/projects/projectComponent";
import ExperienceComponent from "@/components/mycomponents/studentdashboard/experience/experienceComponent";
import CertificateComponent from "@/components/mycomponents/studentdashboard/certificate/certificateComponent";

export default function StudentDashboard(){

    const [currentComponent, setCurrentComponent] = useState('');
    const renderComponent = () => {
        switch (currentComponent) {
            case 'overview':
                return <StudentOverview />;
            case 'editProfile':
                return <EditProfile />;
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

    return(
        <>
            <header>
                <StudentNavigation/>
            </header>
            <section className="flex h-screen bg-gradient-to-r from-teal-200 via-teal-300 to-slate-400">
                <div><StudentSidebar 
                    onDashboard={()=>setCurrentComponent('overview')}
                    onEditProfile={()=> setCurrentComponent('editProfile')}
                    onCreatePortfolio={()=>setCurrentComponent('createPortfolio')}
                    onAcademicDetails={()=>setCurrentComponent('academicDetails')}
                    onProject={()=>setCurrentComponent('project')}
                    onWorkExperience={()=>setCurrentComponent('workExperience')}
                    onCertificate={()=>setCurrentComponent('certificate')}
                /></div>
                <div className="w-full flex-row-3">{renderComponent()}</div>
            </section>
        </>
    );
}