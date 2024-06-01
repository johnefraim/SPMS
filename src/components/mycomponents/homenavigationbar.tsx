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
import { Home, GalleryHorizontalEnd, LogIn, Info, UserPlus, Menu } from "lucide-react"

export function HomeNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <NavigationMenu className="flex justify-between bg-[#EFEFEF] w-full p-4">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/CCS_LOGO.png" alt="unc logo" width={64} height={64} className="ml-4"/>
          <h1 className="ml-2 text-2xl text-orange-500">College of Computer Studies</h1>
        </Link>
        <button
          className="ml-auto md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="text-orange-500" />
        </button>
      </div>

      <NavigationMenuList className={`flex-col md:flex-row md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} md:space-x-4`}>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex items-center`}>
              <Home className="text-orange-500 mr-2"/>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/portfolios" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex items-center`}>
              <GalleryHorizontalEnd className="text-orange-500 mr-2"/>
              Portfolios
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex items-center`}>
              <Info className="text-orange-500 mr-2"/>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/register" legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex items-center`}>
              <UserPlus className="text-orange-500 mr-2"/>
              Sign Up
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
