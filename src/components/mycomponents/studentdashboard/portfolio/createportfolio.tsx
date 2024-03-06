
import React from "react";
import { CreatePortfolioDialog } from "./createportfoliodiaglog";
import { useState } from "react";
import PortfolioListView from "./portfolioListView";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket } from "lucide-react";
export function CreatePortfolio(){
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
    return(
        <>
            <section>
                <div className="ml-4 mt-2 mr-2 w-full">
                    <CreatePortfolioDialog showAlertDialog= {showAlertMessage} refreshPortfolioList={refreshPortfolio} onClick={()=>{setOpen(true)}}/>
                    <PortfolioListView refreshList ={refresh}/>
                </div>
                {showAlert && (
            <Alert className="fixed bottom-4 w-72 right-4 justify-end flex">
                <Rocket color="#00ff80" />
              <AlertDescription>Your portfolio has been created successfully</AlertDescription>
            </Alert>
          )}
            </section>
        </>
    );
}