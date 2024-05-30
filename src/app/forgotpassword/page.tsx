import { HomeNavigation } from "@/components/mycomponents/homenavigationbar";
import Footer from "@/components/mycomponents/footer";
import {ForgotPassword} from "./forgotpasswordComponent";
export default function ForgotPasswordPage(){
    
    return (
        <main className="max-h-screen w-full">
        <header>
            <HomeNavigation/>
        </header>
        <section className="h-full w-full">
            <ForgotPassword/>
        </section>
        <footer>
            <Footer/>
        </footer>
        </main>
    );

};
