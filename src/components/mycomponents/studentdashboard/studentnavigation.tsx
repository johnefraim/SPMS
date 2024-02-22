"use client"

import * as React from "react"
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

export function StudentNavigation() {
  return (
    <NavigationMenu className="flex justify-between bg-gray-100"> 
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
                <AvatarImage onClick={logout} src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <NavigationMenuContent>
            <h3>Logout</h3>
         </NavigationMenuContent>
          </NavigationMenuTrigger>
          </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
