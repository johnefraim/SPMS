
import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import { LoginForm } from "@/components/mycomponents/logincomponenents/loginform";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Footer from "@/components/mycomponents/footer";
import { KeyRound } from "lucide-react";

export default function Login(){
    return(
        <>
        <header>
            <HomeNavigation/>
        </header>
            <section className="flex items-center min-h-screen min-w-max justify-center">
            <Card>
                <CardTitle className=" text-orange-500 flex">Sign In <KeyRound size={20} /></CardTitle>
            <CardContent>
                <div className="flex flex-col items-center justify-center mt-8">
                    <LoginForm/>
                </div>
            </CardContent>
            </Card>
            </section>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}