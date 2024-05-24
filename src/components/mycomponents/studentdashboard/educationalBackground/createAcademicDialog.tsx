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
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { CreateAcademicDetails } from "@/app/api/academicService"

interface CreateAcademicDetailProps{
    onClick?: () => void;
    refreshAcademicListview: () => void;
    showAlertDialog:()=> void;
}

const schema = z.object({
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    gpa: z.number().nonnegative(),
    activities: z.string(),
    description: z.string(),
  });

export function CreateAcademicDialog({onClick, refreshAcademicListview, showAlertDialog}: CreateAcademicDetailProps){
    const [show, setShowAlert] = useState(false)
    const formdata = useForm<z.infer<typeof schema>>({
        defaultValues: {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "", 
          endDate: "",
          gpa: 3,
          activities: "",
          description: "",     
        }
    })
    async function onSubmit(formvalue: z.infer<typeof schema>){
        try {
          
          const response = await CreateAcademicDetails(
                                                      formvalue.school, 
                                                      formvalue.degree, 
                                                      formvalue.fieldOfStudy, 
                                                      formvalue.startDate, 
                                                      formvalue.endDate,
                                                      formvalue.gpa,
                                                      formvalue.activities,
                                                      formvalue.description,
                                                    );
          const { data } = response;
          if(response.status === 201){
            refreshAcademicListview();
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
                <Button size="sm"><Plus/>educational background</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create academic details</DialogTitle>
          <DialogDescription>
            Add important information that want to include.
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
        <Form {...formdata}>
          <form onSubmit={formdata.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={formdata.control} name="school" render={({field}) => (
              <FormItem>
              <Label>School</Label>
              <Input placeholder="Enter School" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="degree" render={({field}) => (
              <FormItem>
              <Label>Degree</Label>
              <Input placeholder="Enter degree" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="fieldOfStudy" render={({field}) => (
              <FormItem>
              <Label>Field of Study</Label>
              <Input placeholder="Enter Field of Study" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="startDate" render={({field}) => (
              <FormItem>
              <Label>Start Date</Label>
              <Input type="date" placeholder="Enter year Graduation " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="endDate" render={({field}) => (
              <FormItem>
              <Label>End Date</Label>
              <Input type="date" placeholder="Enter End Date " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="gpa" render={({field}) => (
              <FormItem>
              <Label>GPA</Label>
              <Input type="number" placeholder="Enter GPA " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="activities" render={({field}) => (
              <FormItem>
              <Label>Activities</Label>
              <Input placeholder="Enter Activities " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="description" render={({field}) => (
              <FormItem>
              <Label>Description</Label>
              <Input type="text" placeholder="Enter Description " {...field}/>
            </FormItem>
            )}>
            </FormField>
            <DialogFooter className="sm:justify-start">
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>

        </Form>
        </div>
      </DialogContent>
        </Dialog>
    )
}