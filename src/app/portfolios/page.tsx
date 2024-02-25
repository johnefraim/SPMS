import React from "react";
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";

export default function portfolios(){
    return(
        <>
        <header>
            <HomeNavigation/>
        </header>
          <section>
            <h1>Portfolios</h1>
            <div className="ml-2 mt-2 mr-2 w-max">
                <p>No Portfolio Found.</p>
            </div>
            
          </section>
        </>
    );
}