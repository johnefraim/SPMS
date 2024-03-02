import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function EditProfile(){
    return(
        <>
           <Card className="ml-2 mt-2 mr-2 w-max">
                <CardTitle className="ml-4 mt-4">Edit Profile</CardTitle>
                <CardContent className="flex">
                    
                    <div className="flex content-center">
                        <div>
                        <Image
                        className="mt-4 space-y-4 rounded-full border-2 border-gray-300 w-full h-32"
                        src={"/CCS_LOGO.png"}
                        alt="model-1"
                        width={100}
                        height={10}
                    />
                    <Input type="file" required className="w-32 flex justify-end shadow-md" />
                        </div>
                        <CardContent className="content-center gap-4 space-y-4">
                        <div className="flex-row gap-2">
                            <Label className="mt-4">Name</Label>
                            <Input type="text" placeholder="Juan"></Input>
                            <Label >Last Name</Label>
                            <Input type="text" placeholder="Dela Cruz"></Input>
                        </div>
                        <div className="flex gap-4">
                            <Label >House No.</Label>
                            <Input type="text" placeholder="183"></Input>
                            <Label>Street</Label>
                            <Input type="text" placeholder="balete"></Input>
                        </div>
                        <div className="flex gap-4">
                            <Label>Barangay</Label>
                            <Input type="text w-64" placeholder="Tondo"></Input>
                            <Label>City</Label>
                            <Input type="text" placeholder="Manila"></Input>
                        </div>
                        <div className="flex gap-4">
                        <Label>Region</Label>
                        <Input type="text" placeholder="Calabarzon"></Input>
                        <Label>Country</Label>
                        <Input type="text" placeholder="Philippines"></Input>
                        </div>
                        <Button>Save</Button>
                    </CardContent>
                    </div>
                </CardContent>
           </Card>
        </>
    );
}