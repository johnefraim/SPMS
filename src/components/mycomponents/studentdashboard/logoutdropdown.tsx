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
import { logout } from "@/app/api/authService";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { getUserDetails } from "@/app/api/userService";

export function LogoutDropDown() {
    const [logoutStatus, setLogout] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string>('/default_user.png');
    useEffect(() => {
      if (logoutStatus) {
        redirect('/');
      }
      const fetchUserDetails = async () => {
        try {
            const response = await getUserDetails();
            console.log('get user response:', response.data.imageUrl)
            setProfilePicture(`${response.data.imageUrl}`); 
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchUserDetails();
    }, [logoutStatus]);
  return (
    <DropdownMenu>
        
      <DropdownMenuTrigger asChild>
        <Avatar>
                <AvatarImage src={profilePicture} alt="user" />
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
