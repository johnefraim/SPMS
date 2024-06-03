import {create} from 'zustand';
import axios from 'axios';
import { getToken } from "@/app/api/authService";

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
  profileImage: string;
}

interface ProfileState {
  profile: ProfileProps | null;
  loading: boolean;
  error: string | null;
  setProfile: (profile: ProfileProps) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: true,
  error: null,
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  refreshProfile: async () => {
    const token = getToken();
    if (!token) return;

    try {
      const decode = JSON.parse(atob(token.split('.')[1]));
      const userId: string = decode.Id;

      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/details`, {
          headers: { Authorization: `Bearer ${token}` }});
    const userData = userResponse.data;
    set({ profile: userData, error: null });

    const imageResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        });

      const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
      userData.profileImage = URL.createObjectURL(imageBlob);
    } catch (error) {
      set({ error: 'Error fetching user details.' });
      console.error('Error fetching user details:', error);
    } finally {
      set({ loading: false });
    }
  },
}));