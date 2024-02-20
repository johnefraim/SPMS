import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function EditProfile(){
    return(
        <>
           <Card className="ml-12 mt-12 w-200">
                <CardTitle>Edit Profile</CardTitle>
                <CardContent>
                    <Image
                        src={"/model-1.png"}
                        alt="model-1"
                        width={200}
                        height={200}
                    />
                    <Input type="file" required className="w-64"/>
                    <CardContent>
                        <Label>Name</Label>
                        <Input type="text"></Input>
                        <Label>Middle Name</Label>
                        <Input type="text"></Input>
                        <Label>LastName</Label>
                        <Input type="text"></Input>
                        <Label>Address</Label>
                        <Label>No.</Label>
                        <Input type="text"></Input>
                        <Label>Street</Label>
                        <Input type="text"></Input>
                        <Label>Brgy</Label>
                        <Input type="text"></Input>
                        <Label>City</Label>
                        <Input type="text"></Input>
                        <Label>Region</Label>
                        <Input type="text"></Input>
                        <Label>Country</Label>
                        <Input type="text"></Input>
                    </CardContent>
                </CardContent>
           </Card>
        </>
    );
}