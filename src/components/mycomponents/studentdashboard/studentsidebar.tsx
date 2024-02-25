"use client"

import * as React from "react"

import Link from "next/link"
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
import { CreatePortfolioDialog } from "./createportfoliodiaglog"

interface StudentSidebarProps {
    onEditProfile: () => void;
    onECreatePortfolio: () => void;
    onDashboard:()=>void;
}

export function StudentSidebar({onEditProfile, onECreatePortfolio, onDashboard}: StudentSidebarProps) {
  return (
    <NavigationMenu className=" bg-gray-100 w-48 h-full items-start mt-2 shadow-md"> 
      <NavigationMenuList className="flex flex-col mt-6 space-y-3">
        <NavigationMenuItem className="w-full">
            <Button variant={"ghost"} onClick={onDashboard} className="w-full justify-start">
                <LayoutDashboard className="text-orange-500"/>Dashboard
            </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"}  onClick={onEditProfile} className="w-full justify-start">
            <SquareUserRound className="text-orange-500"/>
              Profile
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full">
        <Button variant={"ghost"} className="w-full justify-start" onClick={onECreatePortfolio}>
            <GalleryHorizontalEnd className="text-orange-500"/>
              Portfolio
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
