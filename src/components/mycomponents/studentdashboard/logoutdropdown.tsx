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
import { getToken, logout } from "@/app/api/authService";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";


export function LogoutDropDown() {
    const [logoutStatus, setLogout] = useState(false);
    const [profilePicture, setProfilePicture] = useState<Blob | string>(('/default.png'));
    const token = getToken();

    useEffect(() => {
      if (logoutStatus) {
        redirect('/');
      }
      const fetchUserDetails = async () => {
        const token = getToken();
        const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = decodedToken ? decodedToken.Id : null;
        try {
          const response = await axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { imageName } = response.data;
          const responseImage = await axios.get(`http://localhost:8080/api/image/${imageName}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
          });
          setProfilePicture(responseImage.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchUserDetails();
    }, [logoutStatus, token]);
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
