import { useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { getToken } from "@/app/api/authService";
import { Button } from "@/components/ui/button";
import { ProfileEditDialog } from "./profileEditDialog";
import { useProfileStore } from "@/lib/userProfileStore";

const ProfileDisplay = () => {
  const {
    profile,
    setLoading,
    setError,
    refreshProfile,
  } = useProfileStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const token = getToken();
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const decode = JSON.parse(atob(token.split('.')[1]));
      const userId: string = decode.Id;

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      refreshProfile();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
          <Image
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            src={profile?.profileImage || "/default.png"}
            width={128}
            height={128}
            alt="Profile Image"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
          >
            Upload Image
          </Button>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">{`${profile?.name} ${profile?.middleName ? profile.middleName : ''} ${profile?.lastName}`}</h2>
          <ProfileEditDialog />
        </div>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {['Email', 'Address', 'Title', 'Gender', 'Birthday'].map((field, index) => (
              <div key={index}>
                <h3 className="font-semibold">{field}</h3>
                <p>{profile ? (profile as any)[field.toLowerCase()] : ''}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold">Phone</h3>
            <p className="mt-2 text-gray-700">{profile?.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Summary</h3>
            <p className="mt-2 text-gray-700">{profile?.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
