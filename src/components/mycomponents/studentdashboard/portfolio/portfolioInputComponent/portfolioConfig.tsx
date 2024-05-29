import { useState } from "react";
import { Dialog, DialogContent,DialogHeader,DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  CertificationCRUD  from "../../certificate/crudCertification";
import CareerCRUD from "../../career/careerCRUD";
import  PersonalDetailsCRUD  from "../../personalDetails/personalDetailsCRUD";
import EducationalBackgroundCRUD from "../../educationalBackground/educationalBackgroundCRUD";
import ProjectCRUD from "../../projects/projectCRUD";
import SkillCRUD from "../../skill/skillCRUD";

interface PortfolioProps{
    portfolioAttribute: number;
}

const PortfolioConfig: React.FC<PortfolioProps> = ({portfolioAttribute}) => {
    const [refresh, setRefresh] = useState(false);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-500" variant={"secondary"} size={"sm"}>modify</Button>
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
                        <PersonalDetailsCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                    <TabsContent value="Educational Background">
                        <EducationalBackgroundCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                    <TabsContent value="Work Experience">
                        <CareerCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                    <TabsContent value="Projects">
                        <ProjectCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                    <TabsContent value="Skills">
                        <SkillCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                    <TabsContent value="Certifications">
                        <CertificationCRUD portfolioAttribute={portfolioAttribute}/>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default PortfolioConfig;
