"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import { cn } from "@/lib/utils"
//import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button";
import { Home, GalleryHorizontalEnd,LogIn, Info } from "lucide-react";
export function HomeNavigation() {
  return (
    <NavigationMenu className="flex justify-between"> 
      <NavigationMenuList className="flex justify-center items-center">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/CCS_LOGO.png"
            alt="unc logo"
            width={64}
            height={64}
            className="ml-12 mt-4"
          />
          <h1 className="ml-2 mt-4 text-2xl text-orange-500">College of Computer Studies</h1>
        </Link>
      </NavigationMenuList>
      <NavigationMenuList className="flex items-center"> 
        <NavigationMenuItem className="mr-12">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Home />
              Home
            </NavigationMenuLink>
          </Link>
          <Link href="/portfolios" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <GalleryHorizontalEnd />
              Portfolios
            </NavigationMenuLink>
          </Link>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Info size={20}/>
              About
            </NavigationMenuLink>
          </Link>
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <LogIn size={20} />
              Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
