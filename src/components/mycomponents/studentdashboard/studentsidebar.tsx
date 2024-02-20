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

interface StudentSidebarProps {
    onEditProfile: () => void;
    onECreatePortfolio: () => void;
    onDashboard:()=>void;
}

export function StudentSidebar({onEditProfile, onECreatePortfolio, onDashboard}: StudentSidebarProps) {
  return (
    <NavigationMenu className=" bg-gray-200 w-64 h-screen items-start justify-start flex"> 
      <NavigationMenuList className="flex flex-col">
        {/**navigation list */}
        <NavigationMenuItem>
            <Button variant={"ghost"} size={"lg"} className="flex items-center" onClick={onDashboard}>
                <LayoutDashboard className="text-orange-500"/>Dashboard
            </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
        <Button variant={"ghost"} size={"lg"} className="flex items-center" onClick={onEditProfile}>
            <SquareUserRound className="text-orange-500"/>
              Edit profile
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem className="">
        <Button variant={"ghost"} size={"lg"} className="flex items-center" onClick={onECreatePortfolio}>
            <GalleryHorizontalEnd className="text-orange-500"/>
              Create Portfolio
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
