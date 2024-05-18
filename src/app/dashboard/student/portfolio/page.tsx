'use client'
import  PortfolioHome from "@/components/mycomponents/studentdashboard/portfolio/portfolioTemplateComponent/portfolioHome";
import PersonalInformation from "@/components/mycomponents/studentdashboard/portfolio/portfolioTemplateComponent/personalDetails";
export default function Portfolio(){
    const bio = "This is a portfolio page";
    return(
        <>
        <PortfolioHome bio={bio} 
                       name="John Efraim Meraña" 
                       photoUrl="https://picsum.photos/200/300"/>
        <PersonalInformation bio="bio here" 
                             email="john doe" 
                             name="John Doe" 
                             phone="09352636320" 
                             photoUrl="https://picsum.photos/200/300" />
        </>
    );
}