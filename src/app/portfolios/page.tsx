
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import PortfolioList from "@/components/mycomponents/portfolioshowroom/componentPortfolioList";
import SeachPortfolio from "@/components/mycomponents/portfolioshowroom/searchComponent";
const Portfolios: React.FC = ()=>{

    return(
        <>
        <header>
            <HomeNavigation/>
        </header>
          <section>
            <SeachPortfolio/>
             <PortfolioList/>
          </section>
        </>
    );
}
export default Portfolios;