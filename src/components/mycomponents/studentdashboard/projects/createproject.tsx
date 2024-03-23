
import React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket } from "lucide-react";
import { CreateProjectDialog } from "@/components/mycomponents/studentdashboard/projects/createprojectdialog";
import  ProjectListView  from "@/components/mycomponents/studentdashboard/projects/projectlistview";
export function CreateProject(){
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const refreshProject = () => {
        setRefresh(!refresh);
    };
    const showAlertMessage = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 8000);
    }
    return(
        <>
            <section>
                <div className="ml-4 mt-2 mr-2 w-full">
                    <CreateProjectDialog showAlertDialog= {showAlertMessage} refreshProjectList={refreshProject} onClick={()=>{setOpen(true)}}/>
                    <ProjectListView refreshList ={refresh}/>
                </div>
                {showAlert && (
            <Alert className="fixed bottom-4 w-72 right-4 justify-end flex">
                <Rocket color="#00ff80" />
              <AlertDescription>Your Project has been created successfully</AlertDescription>
            </Alert>
          )}
            </section>
        </>
    );
}