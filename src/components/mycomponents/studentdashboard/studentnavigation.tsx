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
import { LogoutDropDown } from "../../mycomponents/studentdashboard/logoutdropdown";
import { Bell } from "lucide-react";

export function StudentNavigation() {
  
  return (
    <NavigationMenu className="flex justify-between bg-stone-100 shadow-md"> 
      <NavigationMenuList className="flex justify-center items-center">
          <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64}className=" ml-12 mt-4 mb-4"/>
          <h1>SPMS</h1>
      </NavigationMenuList>
        <NavigationMenuList className="flex items-center mr-12"> 
          <NavigationMenuItem className="flex mr-4">
            <Bell/>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex">
            <LogoutDropDown/>
          </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}
