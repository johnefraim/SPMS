import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const frameworks = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "non-binary",
      label: "non-binary",
    },
  ]

const EditProfile = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [summary, setSummary] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileImage(e.target.files ? e.target.files[0] : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };
    const handleGenderChange = (value: string) => {
        setGender(value);
    };
    return (
        <div className="max-w-md mx-auto bg-[#EFEFEF] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <form onSubmit={handleSubmit} className="p-8">
                {profileImage && (
                    <Image src={URL.createObjectURL(profileImage)} width={32} height={64} alt="Profile" className="mt-4 w-32 h-32 object-cover rounded-full" />
                )}
                <Label className="block">
                    <span className="text-gray-700">Profile Image</span>
                    <Input type="file" onChange={handleImageChange} className="mt-1 block w-full" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Name</span>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Middle Name</span>
                    <Input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Last Name</span>
                    <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Non-binary">Non-binary</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                <Label className="block mt-4">
                    <span className="text-gray-700">Birthday</span>
                    <Input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Title/Headline</span>
                    <Input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Email</span>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Phone Number</span>
                    <Input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Address</span>
                    <Input type="text" value={Address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </Label>
                <Label className="block mt-4">
                    <span className="text-gray-700">Professional Summary</span>
                    <Textarea value={summary} onChange={e => setSummary(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm space-y-2" />
                </Label>
                <Button type="submit" className="mt-4">Submit</Button>
            </form>
        </div>
    );
};

export default EditProfile;