
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import PortfolioList from "@/components/mycomponents/portfolioshowroom/componentPortfolioList";
const Portfolios: React.FC = ()=>{

    return(
        <>
        <header>
            <HomeNavigation/>
        </header>
          <section>
             <PortfolioList/>
          </section>
        </>
    );
}
export default Portfolios;