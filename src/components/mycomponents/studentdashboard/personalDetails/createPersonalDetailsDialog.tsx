import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { CreatePersonalDetails } from "@/app/api/personalDetailService"

interface CreateAcademicDetailProps{
    onClick?: () => void;
    refreshListview: () => void;
    showAlertDialog:()=> void;
}

const schema = z.object({
    linkedin: z.string(),
    socialMedia: z.string(),
    website: z.string(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    address: z.string(),
  });

export function CreatePersonalDetailscDialog({onClick, refreshListview, showAlertDialog}: CreateAcademicDetailProps){
    const [show, setShowAlert] = useState(false)
    const formdata = useForm<z.infer<typeof schema>>({
        defaultValues: {
            linkedin: "",
            socialMedia: "",
            website: "",
            address: "", 
            dob: "",  
        }
    })
    async function onSubmit(formvalue: z.infer<typeof schema>){
        console.log(formvalue);
        try {
          
          const response = await CreatePersonalDetails(
                                                      formvalue.linkedin, 
                                                      formvalue.socialMedia, 
                                                      formvalue.website, 
                                                      formvalue.dob, 
                                                      formvalue.address,
                                                        );
          const { data } = response;
          if(response.status === 201){
            refreshListview();
            formdata.reset();
            showAlertDialog();
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.log('Validation errors:', error.errors);
          }
        }
      };

    return(
        <Dialog>
            <DialogTrigger>
                <Button size="sm"><Plus/>personal details</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personal Details</DialogTitle>
          <DialogDescription>
            Add important information that want to include.
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
        <Form {...formdata}>
          <form onSubmit={formdata.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={formdata.control} name="linkedin" render={({field}) => (
              <FormItem>
              <Label>LinkedIn</Label>
              <Input placeholder="LinkedIn url" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="socialMedia" render={({field}) => (
              <FormItem>
              <Label>social Media</Label>
              <Input placeholder="Social Media URL" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="website" render={({field}) => (
              <FormItem>
              <Label>Website</Label>
              <Input placeholder="Website URL" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="dob" render={({field}) => (
              <FormItem>
              <Label>Birth Date</Label>
              <Input type="date" placeholder="Birthday" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="address" render={({field}) => (
              <FormItem>
              <Label>Address</Label>
              <Input placeholder="Address " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <DialogFooter className="sm:justify-start">
              <Button type="submit">save</Button>
            </DialogFooter>
          </form>

        </Form>
        </div>
      </DialogContent>
        </Dialog>
    )
}