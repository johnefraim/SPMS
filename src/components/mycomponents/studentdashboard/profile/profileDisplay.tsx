import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {ProfileEditDialog} from "./profileEditDialog";

interface ProfileProps {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decode = JSON.parse(atob(token.split('.')[1]));
          const userId = decode.Id;
          const response = await axios.get(`http://localhost:8080/api/user/${userId}/details`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

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
          setError('Error fetching user details.');
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [refresh]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await axios.post(`http://localhost:8080/api/user/${userId}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Refresh the profile to show the new image
        setRefresh(prev => !prev);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="flex items-center space-x-6">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={profile?.profileImage || "/default.png"}
            alt="Profile Image"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{profile?.name + ' ' + profile?.middleName + ' ' + profile?.lastName}</h2>
            <p className="text-gray-500">{profile?.address}</p>
            <p className="mt-1 text-xl font-semibold">{profile?.title}</p>
          </div>
          <ProfileEditDialog/>
        </div>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
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
    </div>
  );
};

export default ProfileDisplay;
