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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserDetails, updateProfile } from "@/app/api/userService";

interface ProfileEditDialogProps {
  onClick?: () => void;
  refreshPortfolioList: () => void;
  showAlertDialog: () => void;
}

const schema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  birthday: z.string(),
  title: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  summary: z.string(),
});

const frameworks = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-binary", label: "Non-binary" },
];

export function ProfileEditDialog({
  onClick,
  refreshPortfolioList,
  showAlertDialog,
}: ProfileEditDialogProps) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const formdata = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthday: "",
      title: "",
      email: "",
      phoneNumber: "",
      address: "",
      summary: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(e.target.files ? e.target.files[0] : null);
  };

  const submit = async (formValues: any) => {
    try {
      const formData = new FormData();
      formData.append("file", profileImage as File);
      formData.append("firstName", formValues.firstName);
      formData.append("middleName", formValues.middleName);
      formData.append("lastName", formValues.lastName);
      formData.append("gender", formValues.gender);
      formData.append("birthday", formValues.birthday);
      formData.append("title", formValues.title);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("summary", formValues.summary);

      const response = await updateProfile(formData);
      if (response.status === 200) {
        formdata.reset();
        showAlertDialog();
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decode = JSON.parse(atob(token.split(".")[1]));
          const userId = decode.Id;
          const response = await getUserDetails(userId.toString());
          const { data } = response;
          setProfileImage(data.profileImage);
          formdata.reset({
            firstName: data.name,
            middleName: data.middleName,
            lastName: data.lastName,
            gender: data.gender,
            birthday: data.birthday,
            title: data.title,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            summary: data.summary,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pen /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update your Profile</DialogTitle>
          <DialogDescription>
            Add important information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
          <Form {...formdata}>
            <form onSubmit={formdata.handleSubmit(submit)}>
              {profileImage && (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  width={32}
                  height={64}
                  alt="Profile"
                  className="mt-4 w-32 h-32 object-cover rounded-full"
                />
              )}
              <Label className="block">
                <span className="text-gray-700">Profile Image</span>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">First Name</span>
                <Input
                  type="text"
                  {...formdata.register("firstName")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Middle Name</span>
                <Input
                  type="text"
                  {...formdata.register("middleName")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Last Name</span>
                <Input
                  type="text"
                  {...formdata.register("lastName")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {frameworks.map((framework) => (
                      <SelectItem
                        key={framework.value}
                        value={framework.value}
                      >
                        {framework.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label className="block mt-4">
                <span className="text-gray-700">Birthday</span>
                <Input
                  type="date"
                  {...formdata.register("birthday")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Title/Headline</span>
                <Input
                  type="text"
                  {...formdata.register("title")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Email</span>
                <Input
                  type="email"
                  {...formdata.register("email")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Phone Number</span>
                <Input
                  type="tel"
                  {...formdata.register("phoneNumber")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Address</span>
                <Input
                  type="text"
                  {...formdata.register("address")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </Label>
              <Label className="block mt-4">
                <span className="text-gray-700">Professional Summary</span>
                <Textarea
                  {...formdata.register("summary")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm space-y-2"
                />
              </Label>
              <DialogFooter>
                <Button type="submit" className="mt-4">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
