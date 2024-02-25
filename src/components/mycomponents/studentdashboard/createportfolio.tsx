
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePortfolioDialog } from "./createportfoliodiaglog";

export function CreatePortfolio(){
    return(
        <>
            <section>
                <h1>
                    Portfolio
                </h1>
                <div className="ml-2 mt-2 mr-2 w-max">
                    <Button size={"sm"} onClick={()=><CreatePortfolioDialog/>}> <Plus />Create Portfolio</Button>
                    <p>No Portfolio Found.</p>
                </div>
            </section>
        </>
    );
}