import { Button } from "@/components/ui/button"
import axios from "axios"
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
import { set } from "react-hook-form"

export function LogoutDropDown() {
    const [logoutStatus, setLogout] = useState(false);
    const [profilePicture, setProfilePicture] = useState<Blob | string>(('/default.png'));
    const token = localStorage.getItem('token');

    // useEffect(() => {
    //   if (logoutStatus) {
    //     redirect('/');
    //   }
    //   const fetchUserDetails = async () => {
    //     try {
    //       const response = await getUserDetails();
    //       const { data } = response;
    //       const responseImage = await axios.get(`http://localhost:8080/api/image/${data.imageName}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         responseType: 'blob'
    //       });
    //         setProfilePicture(responseImage.data);
    //     } catch (error) {
    //         console.error('Error fetching user details:', error);
    //     }
    // };

    // fetchUserDetails();
    // }, [logoutStatus]);
  return (
    <DropdownMenu>
        
      <DropdownMenuTrigger asChild>
        <Avatar>
        {profilePicture && <AvatarImage src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)} alt="user" />}
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
