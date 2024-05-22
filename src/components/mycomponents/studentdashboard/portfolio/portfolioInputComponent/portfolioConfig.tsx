import { useState } from "react";
import { Dialog, DialogContent,DialogHeader,DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  Career  from "./career";
import Project from "./project";
import SkillInput from "./skills";
import Certification from "./certification";
import { CreateAcademicDialog } from "../../academicdetails/createAcademicDialog";
import { AcademicListview } from "../../academicdetails/academicListview";
import { CreatePersonalDetailscDialog } from "../../personalDetails/createPersonalDetailsDialog";
import { PersonalDetailsListview } from "../../personalDetails/personalDetailsListview";



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
                <Button>Add Information</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw] overflow-y-auto">
                <Tabs defaultValue="Personal Details">
                    <TabsList>
                        <TabsTrigger value="Personal Details">Personal Details</TabsTrigger>
                        <TabsTrigger value="Educational Background">Educational Background</TabsTrigger>
                        <TabsTrigger value="Work Experience">Career</TabsTrigger>
                        <TabsTrigger value="Projects">Projects</TabsTrigger>
                        <TabsTrigger value="Skills">Skills</TabsTrigger>
                        <TabsTrigger value="Certifications">Certifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Personal Details">
                        <CreatePersonalDetailscDialog  refreshListview={refreshPortfolio} showAlertDialog={showAlertMessage} onClick={()=>setOpen(true)}/>
                        <PersonalDetailsListview refreshlist={refresh}/>
                    </TabsContent>
                    <TabsContent value="Educational Background">
                        <CreateAcademicDialog showAlertDialog= {showAlertMessage} refreshAcademicListview={refreshPortfolio} onClick={()=>{setOpen(true)}}/>
                        <AcademicListview/>
                    </TabsContent>
                    <TabsContent value="Work Experience">
                        <Career title={""} employmentType={""} companyName={""} location={""} locationType={""} startDate={""} startYear={""} endDate={""} endYear={""} description={""}/>
                    </TabsContent>
                    <TabsContent value="Projects">
                        <Project/>
                    </TabsContent>
                    <TabsContent value="Skills">
                        <SkillInput/>
                    </TabsContent>
                    <TabsContent value="Certifications">
                        <Certification/>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
