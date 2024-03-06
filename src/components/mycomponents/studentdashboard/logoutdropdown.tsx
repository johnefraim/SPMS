import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { logout } from "@/app/api/route";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";

export function LogoutDropDown() {
    const [logoutStatus, setLogout] = useState(false);
    useEffect(() => {
      if (logoutStatus) {
        redirect('/');
      }
    }, [logoutStatus]);
  return (
    <DropdownMenu>
        
      <DropdownMenuTrigger asChild>
        <Avatar>
                <AvatarImage src="/CCS_LOGO.png" alt="@shadcn" />
                <AvatarFallback>user</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { logout(); setLogout(true); }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
