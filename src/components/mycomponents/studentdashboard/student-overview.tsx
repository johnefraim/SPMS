import { Card, CardTitle } from "@/components/ui/card";
import { UserRoundSearch } from "lucide-react";

export function StudentOverview(){
    const name = localStorage.getItem('name');
    return(
        <section>
           <div className="h-14 mt-12 ml-2">
                <h1 className="text-lg">Welcome back! {name}!</h1>
            </div> 
            <div className="grid grid-cols-3 grid-flow-row gap-4 ml-2">
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Personal Details</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Certificates</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Projects</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Skills</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Achievements</CardTitle>
                </Card>
                <Card className="h-32 w-64 bg-gray-100">
                    <CardTitle className="text-md mt-2 ml-2">Work Experience</CardTitle>
                </Card>
            </div>

        </section>
    );
}