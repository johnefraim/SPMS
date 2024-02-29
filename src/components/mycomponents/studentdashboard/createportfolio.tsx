
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePortfolioDialog } from "./createportfoliodiaglog";
import { useState } from "react";

export function CreatePortfolio(){
    const [open, setOpen] = useState(false);
    return(
        <>
            <section>
                <h1>
                    Portfolio
                </h1>
                <div className="ml-2 mt-2 mr-2 w-max">
                    <CreatePortfolioDialog onClick={()=>{setOpen(true)}}/>
                    
                    <p>No Portfolio Found.</p>
                </div>
            </section>
        </>
    );
}