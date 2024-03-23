
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import Footer from "@/components/mycomponents/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/mycomponents/logincomponents/loginform";
import { KeyRound } from "lucide-react";

export default function Home() {
  return (
    <>
      <header>
        <HomeNavigation/>
      </header>
      <main>
        <section className="flex">
        <div className="h-lvh flex w-1/2 justify-center items-center">
            <div className="items-stretch">
              <h1 className="text-5xl font-bold text-orange-500 ml-16 leading-16">Programmers teaching Programmers to code and to collaborate!</h1>
            </div>
          </div>
          <div className="flex w-1/2 justify-center items-center">
        <Card className="flex-2 w-1/2 bg-[#EFEFEF]">
        <CardTitle className="flex font-semibold text-[#205375] mt-4 ml-6">Sign In <KeyRound size={20} className="flex" /></CardTitle>
          <CardContent className="flex">
              <LoginForm />
          </CardContent>
      </Card>
      </div>
        </section>
        </main>
        <footer>
          <Footer/>
        </footer>
    </>
  );
}
