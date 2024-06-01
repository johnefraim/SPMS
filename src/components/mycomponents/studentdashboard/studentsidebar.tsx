"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import {
  LayoutDashboard,
  SquareUserRound,
  GalleryHorizontalEnd,
  GraduationCap,
  FolderGit2,
  Briefcase,
  Medal,
  Trophy,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface StudentSidebarProps {
  onProfile: () => void;
  onCreatePortfolio: () => void;
  onDashboard: () => void;
}

export function StudentSidebar({
  onProfile,
  onCreatePortfolio,
  onDashboard,
}: StudentSidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Button
        variant={"ghost"}
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="text-orange-500" />
      </Button>
      <NavigationMenu
        className={`bg-[#EFEFEF] w-1/3 md:w-48 h-full items-start shadow-2xl fixed md:relative z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <NavigationMenuList className="flex flex-col mt-6 space-y-3">
          <NavigationMenuItem className="w-full flex items-center space-x-4">
            <Image
              src="/CCS_LOGO.png"
              alt="unc logo"
              width={48}
              height={48}
              className="md:w-16 md:h-16 ml-4 mt-2 mb-4"
            />
            <h1 className="text-lg md:text-xl lg:text-2xl text-orange-500">SPMS</h1>
          </NavigationMenuItem>

          <NavigationMenuItem className="w-full">
            <Button
              variant={"ghost"}
              onClick={() => {
                setActiveItem("dashboard");
                onDashboard();
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start hover:text-orange-500 ${
                activeItem === "dashboard" ? "text-orange-500" : ""
              }`}
            >
              <LayoutDashboard className="mr-2" />
              Home
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem className="w-full">
            <Button
              variant={"ghost"}
              onClick={() => {
                setActiveItem("profile");
                onProfile();
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start hover:text-orange-500 ${
                activeItem === "profile" ? "text-orange-500" : ""
              }`}
            >
              <SquareUserRound className="mr-2" />
              Profile
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem className="w-full">
            <Button
              variant={"ghost"}
              onClick={() => {
                setActiveItem("portfolio");
                onCreatePortfolio();
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start hover:text-orange-500 ${
                activeItem === "portfolio" ? "text-orange-500" : ""
              }`}
            >
              <GalleryHorizontalEnd className="mr-2" />
              Portfolio
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
