"use client"
import Link from "next/link"
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { logout } from "@/app/api/route";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"


export function StudentNavigation() {

  const [logoutStatus, setLogout] = useState(false);
  useEffect(() => {
    if (logoutStatus) {
      redirect('/login');
    }
  }, [logoutStatus]);
  
  return (
    <NavigationMenu className="flex justify-between bg-gray-100 shadow-md"> 
      <NavigationMenuList className="flex justify-center items-center">
        <Link href={"/"} className="flex items-center">
          <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64}className=" ml-12 mt-4 mb-4"/>
          <h1>SPMS</h1>
        </Link>
      </NavigationMenuList>
        <NavigationMenuList className="flex items-center mr-12"> 
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar>
                <AvatarImage onClick={() => { logout(); setLogout(true); }} src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}
