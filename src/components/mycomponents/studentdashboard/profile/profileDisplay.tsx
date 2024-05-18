/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getUserDetails } from "@/app/api/userService";
import { ProfileEditDialog } from "./profileEditDialog";
import axios from "axios";
import { set } from "react-hook-form";
import { string } from "zod";



const ProfileDisplay = () => {
    const [profileImage, setProfileImage] = useState<Blob | null>(null);
    const [imageName, setImageName] = useState("");
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [summary, setSummary] = useState('');
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [refresh, setRefresh] = useState(false);
   
    
    
    useEffect(() => {
      const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await getUserDetails();
                const { data } = response;
                setName(data.name);
                setMiddleName(data.middleName);
                setLastName(data.lastName);
                setGender(data.gender);
                setBirthday(data.birthday);
                setTitle(data.title);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setAddress(data.address);
                setSummary(data.summary);
                const responseImage = await axios.get(`http://localhost:8080/api/image/${data.imageName}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  },
                  responseType: 'blob'
                });
               const imageUrl = responseImage.data;
                setProfileImage(imageUrl);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };
      fetchUserDetails();
    }, []);

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
      <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex justify-end mb-4">
          <ProfileEditDialog
            showAlertDialog={showAlertMessage}
            refreshPortfolioList={refreshPortfolio}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="relative w-full h-64 mb-6">
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              className="object-cover w-full h-full rounded-lg shadow-md"
              alt="Profile"
            />
          )}
        </div>
        <div className="text-gray-900">
          <div className="text-lg font-semibold mb-2">
            {name} {middleName} {lastName}
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-gray-700">
            <div>
              <span className="font-semibold">Gender:</span> {gender}
            </div>
            <div>
              <span className="font-semibold">Birthday:</span> {birthday}
            </div>
            <div>
              <span className="font-semibold">Title:</span> {title}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {email}
            </div>
            <div>
              <span className="font-semibold">Phone Number:</span> {phoneNumber}
            </div>
            <div>
              <span className="font-semibold">Address:</span> {address}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Professional Summary</div>
            <div className="text-gray-700 mt-2">{summary}</div>
          </div>
        </div>
      </div>
    </Card>
    );
};

export default ProfileDisplay;
