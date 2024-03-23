import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Info, Trophy, PencilRuler, Medal, Briefcase, FolderGit2 } from "lucide-react";
export function StudentOverview(){

    return(
        <section>
           <div className="h-14 mt-12 ml-2">
                <h1 className="text-4xl leading-14">Welcome back! {localStorage.getItem('name')}!</h1>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-2">
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Personal Details</CardTitle>
                    <CardContent>
                    <Info />
                    </CardContent>
                </Card>
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Certificates</CardTitle>
                    <CardContent>
                    <Medal />
                    </CardContent>
                </Card>
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Projects</CardTitle>
                    <CardContent>
                    <FolderGit2 />
                    </CardContent>
                </Card>
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Skills</CardTitle>
                    <CardContent>
                        <PencilRuler />
                    </CardContent>
                    
                </Card>
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Achievements</CardTitle>
                    <CardContent>
                        <Trophy />
                    </CardContent>
                </Card>
                <Card className="h-32 w-64 bg-[#205375] text-white">
                    <CardTitle className="text-lg leading-10 ml-4">Work Experience</CardTitle>
                    <CardContent>
                    <Briefcase />
                    </CardContent>
                </Card>
            </div>

        </section>
    );
}
