import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ProfileEditDialog } from "./profileEditDialog";
import Image from "next/image";

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
  profileImage?: string;
}

const ProfileDisplay = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decode = JSON.parse(atob(token.split('.')[1]));
      const userId = decode.Id;
      const response = await axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/user/${userId}/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      if (data.profileImage) {
        const imageResponse = await axios.get(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/images/${data.profileImage}`, {
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
  };

  useEffect(() => {
    fetchUserDetails();
  }, [refresh]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const token = localStorage.getItem('token');
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
        const decode = JSON.parse(atob(token.split('.')[1]));
        const userId = decode.Id;
        await axios.post(`http://ec2-54-227-188-19.compute-1.amazonaws.com:8080/api/image/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        setRefresh(prev => !prev); // Trigger a refresh
    } catch (error) {
        console.error('Error uploading file:', error);
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
          <Image
            className="w-32 h-32 rounded-full object-cover"
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
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
          >
            Upload Image
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{`${profile?.name} ${profile?.middleName} ${profile?.lastName}`}</h2>
            <p className="text-gray-500">{profile?.address}</p>
            <p className="mt-1 text-xl font-semibold">{profile?.title}</p>
          </div>
          <ProfileEditDialog />
        </div>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {['Email', 'Phone', 'Address', 'Gender', 'Birthday'].map((field, index) => (
              <div key={index}>
                <h3 className="font-semibold">{field}</h3>
                <p>{profile ? (profile as any)[field.toLowerCase()] : ''}</p>
              </div>
            ))}
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
