import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getUserDetails } from "@/app/api/userService";
import { ProfileEditDialog } from "./profileEditDialog";
import axios from "axios";

const ProfileDisplay = () => {
    const [profileImage, setProfileImage] = useState<string>("/default_user.png");
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
    const [imageName, setImageName] = useState();
    useEffect(() => {
      const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await getUserDetails();
                const { data } = response;
                setProfileImage(data.imageUrl);
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
          <div className="justify-start items-start"><ProfileEditDialog showAlertDialog= {showAlertMessage} refreshPortfolioList={refreshPortfolio}  onClick={()=>{setOpen(true)}}/></div>
            <div className="p-8">
                <div className="relative">
                  <div className="w-full h-96 relative">

                    <Image
                      src={profileImage}
                      layout="fill"
                      objectFit="cover"
                      alt="Profile"
                    />
                  </div>
                </div>
                <div className="mt-6">
                    <div className="text-lg font-semibold text-gray-900">Fullname:{name} {middleName} {lastName}</div>
                    <div className="text-gray-700 mt-2">Gender:{gender}</div>
                    <div className="text-gray-700 mt-2">Birthday:{birthday}</div>
                    <div className="text-gray-700 mt-2">Title:{title}</div>
                    <div className="text-gray-700 mt-2">Email:{email}</div>
                    <div className="text-gray-700 mt-2">Phone Number:{phoneNumber}</div>
                    <div className="text-gray-700 mt-2">Address:{address}</div>
                    <div className="mt-4">
                        <div className="text-gray-900 text-lg font-semibold">Professional Summary</div>
                        <div className="text-gray-700 mt-2">{summary}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProfileDisplay;
