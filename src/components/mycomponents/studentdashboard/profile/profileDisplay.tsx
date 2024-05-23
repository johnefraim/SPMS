import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getUserDetails } from "@/app/api/userService";
import { ProfileEditDialog } from "./profileEditDialog";
import axios from "axios";

interface ProfileProps {
  profileImage: string | null;
  name: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthday: string;
  title: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
}

const ProfileDisplay = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decode = JSON.parse(atob(token.split('.')[1]));
          const userId = decode.Id;
          const response = await getUserDetails(userId.toString());
          const { data } = response;

          if (data.profileImage) {
            const imageResponse = await axios.get(data.profileImage, {
              responseType: 'blob',
            });
            const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
            data.profileImage = URL.createObjectURL(imageBlob);
          }
          setProfile(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();

    return () => {
      if (profile?.profileImage) {
        URL.revokeObjectURL(profile.profileImage);
      }
    };
  }, [refresh, profile?.profileImage]);

  const showAlertMessage = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 8000);
  };

  const refreshPortfolio = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-h-screen bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full"
          src={profile?.profileImage || ""}
          alt="Profile Image"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile?.name + ' ' + profile?.middleName + ' ' + profile?.lastName}</h2>
          <p className="text-gray-500">{profile?.address}</p>
          <p className="mt-1 text-lg font-semibold">{profile?.title}</p>
        </div>
        <ProfileEditDialog/>
      </div>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{profile?.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>{profile?.phoneNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>{profile?.address}</p>
          </div>
          <div>
            <h3 className="font-semibold">Gender</h3>
            <p>{profile?.gender}</p>
          </div>
          <div>
            <h3 className="font-semibold">Birthday</h3>
            <p>{profile?.birthday}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Summary</h3>
          <p className="mt-2 text-gray-700">{profile?.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
