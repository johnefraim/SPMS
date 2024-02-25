
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import SectionPage from "@/components/mycomponents/homesectionpage";
import Footer from "@/components/mycomponents/footer";

export default function Home() {
  return (
    <>
      <header>
        <HomeNavigation/>
      </header>
      <main>
        <section className="flex 1/2 ml-12">
          <div className="flex 1/2 justify-center">
          <SectionPage 
            h1tag="&quot;Programmers Teaching Programmers to code and to collaborate!&quot;"/>
          </div>
        </section>
        </main>
        <footer>
          <Footer/>
        </footer>
    </>
  );
}
