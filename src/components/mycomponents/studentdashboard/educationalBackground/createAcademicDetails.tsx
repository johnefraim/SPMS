import React, { useState } from "react";
import { AcademicListview } from "./academicListview";


export function CreateAcademicDetail(){
    const [open, setOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    

    return(
        <>
            <section>
                <div className="ml-4 mt-2 mr-2 w-full">
                    <AcademicListview refreshlist={refresh}/>
                </div>
            </section>
        </>
    )
}