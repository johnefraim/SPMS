import { HomeNavigation } from '@/components/mycomponents/homenavigationbar';
import { RegistrationComponent } from '@/app/register/registrationComponent';
import React from 'react';
import Footer from '@/components/mycomponents/footer';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

function Page() {
    return (
        <>
            <header>
            <HomeNavigation/>
            </header>
            <section className='h-lvh flex justify-center items-center '>
                <Card className='items-center justify-center w-1/4'>
                    <CardTitle className='ml-6 mb-4 mt-4'>Sign Up</CardTitle>
                    <CardContent>
                        <RegistrationComponent/>
                    </CardContent>
                </Card>
            </section>
            <Footer/>
        </>
    );
}

export default Page;