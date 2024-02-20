
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreatePortfolio(){
    return(
        <>
            <section>
                <h1>
                    Portfolio
                </h1>
                <div className="h-96">
                    <Button> <Plus />Add Portfolio</Button>
                    <p>No Portfolio Found.</p>
                </div>
            </section>
        </>
    );
}