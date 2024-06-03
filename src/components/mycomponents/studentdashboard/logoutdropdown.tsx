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
import { useProfileStore } from "@/lib/userProfileStore";

export function LogoutDropDown() {
  const [logoutStatus, setLogout] = useState(false);
  const [profilePicture, setProfilePicture] = useState<Blob | string>('/default.png');
  const token = getToken();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { profile } = useProfileStore();

  useEffect(() => {
    if (logoutStatus) {
      redirect('/');
    }
    if (profile && profile.profileImage) {
      setProfilePicture(profile.profileImage);
    } else {
      const fetchUserDetails = async () => {
        const token = getToken();
        const decodedToken = token? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = decodedToken? decodedToken.Id : null;
        try {
          const imageResponse = await axios.get(`${apiUrl}/api/image/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob',
          });
          const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
          const pic = URL.createObjectURL(imageBlob);
          setProfilePicture(pic);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }
  }, [logoutStatus, token, apiUrl, profile]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {profilePicture && <AvatarImage src={typeof profilePicture === 'string'? profilePicture : URL.createObjectURL(profilePicture)} alt="avatar" />}
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