import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import { LoginForm } from "@/components/mycomponents/logincomponents/loginform";
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
                <Card className="flex-2 w-64">
                    <CardTitle className="flex font-semibold text-orange-500 mt-4 ml-6 ">Sign In <KeyRound size={20} className="flex" /></CardTitle>
                    <CardContent className="flex">
                        <LoginForm />
                    </CardContent>
                </Card>
            </section>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}