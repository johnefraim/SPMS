"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Home, GalleryHorizontalEnd,LogIn, Info } from "lucide-react"

export function HomeNavigation() {
  return (
    <NavigationMenu className="flex justify-between bg-gray-100"> 
      <NavigationMenuList className="flex justify-center items-center">
        <Link href={"/"} className="flex items-center">
          <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64}className="ml-12 mt-4 mb-4"/>
          <h1 className="ml-2 mt-4 text-2xl text-orange-500">College of Computer Studies</h1>
        </Link>
      </NavigationMenuList>
      <NavigationMenuList className="flex items-center mr-12"> 
        <NavigationMenuItem className="">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Home className="text-orange-500"/>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
          <NavigationMenuItem>
              <Link href="/portfolios" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <GalleryHorizontalEnd className="text-orange-500"/>
                  Portfolios
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Info className="text-orange-500"/>
              About
            </NavigationMenuLink>
          </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LogIn className="text-orange-500"/>
                Login
              </NavigationMenuLink>
          </Link>
          </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
