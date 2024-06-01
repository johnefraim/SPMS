import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { set, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { getToken } from "@/app/api/authService";

interface ProfileProps {
  name: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  title: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
}

const GenderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export function ProfileEditDialog() {
  const [profile, setProfile] = useState<ProfileProps>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [selectedGender, setSelectedGender] = useState(profile?.gender || "Male");


  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.Id;
        try {
          const response = await axios.get(`${apiUrl}/api/user/${userId}/details`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setProfile(response.data);

        } catch (error) {
          setError('Error fetching profile.');
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [refresh, apiUrl]);

  const handleSave = async (updatedProfile: ProfileProps) => {
    try {
      const token = getToken();
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.Id;

        if (!updatedProfile.gender === null || updatedProfile.gender === 'undefined') {
          if (profile) {
            profile.gender = 'Male';
          }
        }
        const response = await axios.put(`${apiUrl}/api/user/update/${userId}`, updatedProfile, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("request data;"+ 
        updatedProfile.gender,
        updatedProfile.birthday,
        updatedProfile.name,
        updatedProfile.middleName,
        updatedProfile.lastName,
        updatedProfile.title,
        updatedProfile.email,
        updatedProfile.phoneNumber,
        updatedProfile.address,
        );
        setProfile(updatedProfile);
        reset({
          name: '',
          middleName: '',
          lastName: '',
          gender: '',
          birthday:  new Date(),
          title: '',
          email: '',
          phoneNumber: '',
          address: '',
          summary: '',
        });
        setRefresh(true);
        
      }
    } catch (error) {
      setError('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  const {register,handleSubmit, reset} = useForm<ProfileProps>();

  const onSubmit = handleSubmit(async (data) => {await handleSave(data);});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update your Profile</DialogTitle>
          <DialogDescription>Add important information.</DialogDescription>
        </DialogHeader>
        {profile && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Name</Label>
              <Input type="text" {...register("name")} defaultValue={profile.name} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Middle Name</Label>
              <Input type="text" {...register("middleName")} defaultValue={profile.middleName} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Last Name</Label>
              <Input type="text" {...register("lastName")} defaultValue={profile.lastName} className="border p-2 rounded" />
            </div>
            
              <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Gender</Label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {GenderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
  <Label className="font-semibold">Birthday</Label>
  <Input
  type="date"
  {...register("birthday")}
  defaultValue={profile && profile.birthday ? new Date(profile.birthday).toISOString().split('T')[0] : ''}
  className="border p-2 rounded"
/>
  </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Title</Label>
              <Input type="text" {...register("title")} defaultValue={profile.title} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Email</Label>
              <Input type="email" {...register("email")} defaultValue={profile.email} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Phone Number</Label>
              <Input type="text" {...register("phoneNumber")} defaultValue={profile.phoneNumber} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Address</Label>
              <Input type="text" {...register("address")} defaultValue={profile.address} className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">Summary</Label>
              <Textarea {...register("summary")} defaultValue={profile.summary} className="border p-2 rounded" />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
      {error && <p className="text-red-500">{error}</p>}
    </Dialog>
  );
}
