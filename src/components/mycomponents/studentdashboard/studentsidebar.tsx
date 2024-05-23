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

interface StudentSidebarProps {
    onProfile: () => void;
    onCreatePortfolio: () => void;
    onDashboard:()=>void;
}

export function StudentSidebar({onProfile, 
                              onCreatePortfolio, 
                              onDashboard, 
                            }: StudentSidebarProps) {
  
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <NavigationMenu className=" bg-][EFEFEF] w-48 h-full items-start shadow-2xl"> 
      <NavigationMenuList className="flex flex-col mt-6 space-y-3">
        <NavigationMenuItem className="w-full flex items-center space-x-4">
        <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64}className="items-center ml-4 mt-2  mb-4"/>
          <h1>SPMS</h1>
        </NavigationMenuItem>
          
        <NavigationMenuItem className="w-full">
            <Button variant={"ghost"} 
                    onClick={() => {
                      setActiveItem("dashboard");
                      onDashboard();
                    }} 
                    className={`w-full justify-start hover:text-orange-500 ${
                      activeItem === "dashboard" ? "text-orange-500" : ""
                    }`}>
                <LayoutDashboard/>Home
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
              Profile
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"} onClick={() => {
              setActiveItem("portfolio");
              onCreatePortfolio();
            }}
            className={`w-full justify-start hover:text-orange-500${activeItem === "portfolio" ? "text-orange-500" : ""}`}>
            <GalleryHorizontalEnd />
              Portfolio
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
