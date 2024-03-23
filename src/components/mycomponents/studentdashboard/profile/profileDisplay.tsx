import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getUserDetails } from "@/app/api/userService";


const ProfileDisplay = () => {
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

    useEffect(() => {
      const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.Id;
            const response = await getUserDetails(userId.toString());
            const { data } = response;
           console.log('User details:', data);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        }
      };
  
      fetchUserDetails();
    }, []);

    return (
        <Card className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="p-8">
                <div className="relative">
                    <div className="w-full h-96 relative">
                        <Image src="/model-1.png" layout="fill" objectFit="cover" alt="Profile"  />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-lg font-semibold text-gray-900">{name} {middleName} {lastName}</div>
                    <div className="text-gray-700 mt-2">{gender}, {birthday}</div>
                    <div className="text-gray-700 mt-2">{title}</div>
                    <div className="text-gray-700 mt-2">{email}</div>
                    <div className="text-gray-700 mt-2">{phoneNumber}</div>
                    <div className="text-gray-700 mt-2">{address}</div>
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
