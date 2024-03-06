
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
        <section className="flex 1/2 bg-gradient-to-r from-teal-200 via-teal-300 to-slate-400">
          <div className="flex 1/2 justify-center">
          <SectionPage 
            h1tag="&quot;Programmers teaching Programmers to code and to collaborate!&quot;"/>
          </div>
        </section>
        </main>
        <footer>
          <Footer/>
        </footer>
    </>
  );
}
