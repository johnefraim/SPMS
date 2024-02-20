import { Card, CardTitle } from "@/components/ui/card";
import { UserRoundSearch } from "lucide-react";

export function StudentOverview(){
    return(
        <section>
           <div className="h-14 mt-12 ml-12">
                <h1 className="text-lg">Welcome back! Student!</h1>
            </div> 
            <div className="grid grid-cols-3 gap-4 ml-12 mt-12">
            <Card className="h-24 w-64">
                    <CardTitle className="text-lg">Personal Details</CardTitle>
                    <UserRoundSearch className="text-orange-500"/>
                </Card>
                <Card className="h-24 w-64">
                    <CardTitle className="text-lg">Certificates</CardTitle>
                </Card>
                <Card className="h-24 w-64 ">
                    <CardTitle className="text-lg">Projects</CardTitle>
                </Card>
                <Card className="h-24 w-64 ">
                    <CardTitle className="text-lg">Skills</CardTitle>
                </Card>
                <Card className="h-24 w-64">
                    <CardTitle className="text-lg">Achievements</CardTitle>
                </Card>
                <Card className="h-24 w-64">
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                </Card>
            </div>

        </section>
    );
}