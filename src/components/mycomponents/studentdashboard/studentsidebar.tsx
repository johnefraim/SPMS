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
import { LayoutDashboard, SquareUserRound, GalleryHorizontalEnd  } from "lucide-react"
import { Button } from "@/components/ui/button"


interface StudentSidebarProps {
    onEditProfile: () => void;
    onCreatePortfolio: () => void;
    onDashboard:()=>void;
}

export function StudentSidebar({onEditProfile, onCreatePortfolio, onDashboard}: StudentSidebarProps) {
  
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <NavigationMenu className=" bg-gray-100 w-48 h-full items-start mt-2 shadow-md"> 
      <NavigationMenuList className="flex flex-col mt-6 space-y-3">
        <NavigationMenuItem className="w-full">
            <Button variant={"ghost"} 
                    onClick={() => {
                      setActiveItem("dashboard");
                      onDashboard();
                    }} 
                    className={`w-full justify-start ${
                      activeItem === "dashboard" ? "text-orange-500" : ""
                    }`}>
                <LayoutDashboard className="text-orange-500"/>Dashboard
            </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"}  onClick={() => {
              setActiveItem("profile");
              onEditProfile();
            }}
            className={`w-full justify-start ${
              activeItem === "profile" ? "text-orange-500" : ""
            }`}>
            <SquareUserRound className="text-orange-500"/>
              Profile
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"} onClick={() => {
              setActiveItem("portfolio");
              onCreatePortfolio();
            }}
            className={`w-full justify-start ${
              activeItem === "portfolio" ? "text-orange-500" : ""
            }`}>
            <GalleryHorizontalEnd className="text-orange-500"/>
              Portfolio
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
