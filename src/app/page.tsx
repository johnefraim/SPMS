import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import Footer from "@/components/mycomponents/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/app/login/loginform";
import { KeyRound } from "lucide-react";

export default function Home() {
  
  return (
    <div className="h-screen flex flex-col">
      <header>
        <HomeNavigation />
      </header>
      <main className="flex-grow bg-[#EFEFEF] pt-8 pb-8 h-full w-full">
  <section className="flex flex-col md:flex-row flex-grow items-center justify-center h-full w-full">
    <div className="md:w-1/2 bg-[#EFEFEF] flex justify-center items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 ml-8 md:ml-16 leading-snug md:leading-16">Programmers teaching Programmers to code and to collaborate!</h1>
      </div>
    </div>
    <div className="md:w-1/2 bg-[#EFEFEF] flex justify-center items-center">
      <Card className="w-full md:w-1/2 bg-[#EFEFEF]">
        <CardTitle className="font-semibold text-[#205375] mt-4 ml-6">Sign In <KeyRound size={20} className="inline" /></CardTitle>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  </section>
</main> 
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
