import { useState } from "react";
import { Dialog, DialogContent,DialogHeader,DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  Career  from "./career";
import Project from "./project";
import SkillInput from "./skills";
import Certification from "./certification";
import { CreateAcademicDialog } from "../../educationalBackground/createAcademicDialog";
import { AcademicListview } from "../../educationalBackground/academicListview";
import { CreatePersonalDetailscDialog } from "../../personalDetails/createPersonalDetailsDialog";
import { PersonalDetailsListview } from "../../personalDetails/personalDetailsListview";
import  CertificationCRUD  from "../../certificate/crudCertification";
import CareerCRUD from "../../career/careerComponent";
import  PersonalDetailsCRUD  from "../../personalDetails/personalDetailsCRUD";
import EducationalBackgroundCRUD from "../../educationalBackground/educationalBackgroundCRUD";
import ProjectCRUD from "../../projects/projectCRUD";
import SkillCRUD from "../../skill/skillCRUD";

export default function PortfolioConfig() {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    const refreshPortfolio = () => {
        setRefresh(!refresh);
    };
    const showAlertMessage = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 8000);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-500" variant={"secondary"} size={"sm"}>setup</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw] overflow-y-auto">
                <Tabs defaultValue="Personal Details" className="bg-gray-100 h-[80vh]">
                    <TabsList>
                        <TabsTrigger value="Personal Details">Personal Details</TabsTrigger>
                        <TabsTrigger value="Educational Background">Educational Background</TabsTrigger>
                        <TabsTrigger value="Work Experience">Career</TabsTrigger>
                        <TabsTrigger value="Projects">Projects</TabsTrigger>
                        <TabsTrigger value="Skills">Skills</TabsTrigger>
                        <TabsTrigger value="Certifications">Certifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Personal Details">
                        <PersonalDetailsCRUD/>
                    </TabsContent>
                    <TabsContent value="Educational Background">
                        <EducationalBackgroundCRUD/>
                    </TabsContent>
                    <TabsContent value="Work Experience">
                        <CareerCRUD/>
                    </TabsContent>
                    <TabsContent value="Projects">
                        <ProjectCRUD/>
                    </TabsContent>
                    <TabsContent value="Skills">
                        <SkillCRUD/>
                    </TabsContent>
                    <TabsContent value="Certifications">
                        <CertificationCRUD/>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
