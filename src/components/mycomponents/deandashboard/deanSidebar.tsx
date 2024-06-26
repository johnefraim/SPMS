"use client"

import {useState} from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent
} from "@/components/ui/navigation-menu"
import { LayoutDashboard, 
        SquareUserRound, 
        GalleryHorizontalEnd,
        GraduationCap,
        FolderGit2,
        Briefcase,
        Medal,
        Trophy,
      } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

interface DeanSidebarProps {
    onDeanOverview: () => void;
    onProfile:()=>void;
}

export function DeanSidebar({onDeanOverview,  
                              onProfile, 
                            }: DeanSidebarProps) {
  
  const [activeItem, setActiveItem] = useState("deanOverview");

  return (
    <NavigationMenu className=" bg-][EFEFEF] w-48 h-screen items-start shadow-2xl"> 
      <NavigationMenuList className="flex flex-col mt-6 space-y-3">
        <NavigationMenuItem className="w-full flex items-center space-x-4">
        <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64}className="items-center ml-4 mt-2  mb-4"/>
          <h1>SPMS</h1>
        </NavigationMenuItem>
          
        <NavigationMenuItem className="w-full">
            <Button variant={"ghost"} 
                    onClick={() => {
                      setActiveItem("deanOverview");
                      onDeanOverview();
                    }} 
                    className={`w-full justify-start hover:text-orange-500 ${
                      activeItem === "deanOverview" ? "text-orange-500" : ""
                    }`}>
                <LayoutDashboard/>Dashboard
            </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"}  onClick={() => {
              setActiveItem("profile");
              onProfile();
            }}
            className={`w-full justify-start hover:text-orange-500 ${
              activeItem === "profile" ? "text-orange-500" : ""
            }`}>
            <SquareUserRound />
              Student Profile
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"} onClick={() => {
              setActiveItem("portfolio");
              
            }}
            className={`w-full justify-start hover:text-orange-500${activeItem === "portfolio" ? "text-orange-500" : ""}`}>
            <GalleryHorizontalEnd />
              Student Portfolio
          </Button>
        </NavigationMenuItem>
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}
