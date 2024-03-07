

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
//import { createPortfolio } from "@/app/api/createportfolio"
import { useState } from "react"
import { Annie_Use_Your_Telescope } from "next/font/google"

interface CreateProjectDialogProps {
  onClick?: () => void;
  refreshProjectList: () => void;
  showAlertDialog:()=> void;
}

const schema = z.object({
  projectImage: z.string().nullable(),
  projectTitle: z.string(),
  description: z.string(),
  Role: z.string(),
  technologies: z.string(),
  projectLink: z.string(),
  projectGithub: z.string(),
});

export function CreateProjectDialog({ onClick, refreshProjectList, showAlertDialog }: CreateProjectDialogProps) {

  const [showAlert, setShowAlert] = useState(false);
const formdata = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
        projectImage: '',
        projectTitle: '',
        description: '',
        Role: '',
        technologies: '',
        projectLink: '',
        projectGithub: '',
    },
});

  async function onSubmit(formvalue: z.infer<typeof schema>){
    //try {
      
      //const response = await createProject();
      //const { data } = response;
      //if(response.status === 201){
        //refreshProjectList();
        //formdata.reset();
        //showAlertDialog();
      //}
   // } catch (error) {
     // if (error instanceof z.ZodError) {
        //console.log('Validation errors:', error.errors);
      //}
    //}
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"><Plus />Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create your Project</DialogTitle>
          <DialogDescription>
            Add important information that want to include.
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
        <Form {...formdata}>
          <form onSubmit={formdata.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={formdata.control} name="projectImage" render={({field}) => (
                <FormItem>
                <Label>Images</Label>
                <Input type="file"  placeholder="Image" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="projectTitle" render={({field}) => (
              <FormItem>
              <Label>Title</Label>
              <Input placeholder="Enter Project Title" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="description" render={({field}) => (
              <FormItem>
              <Label>Description</Label>
              <Input placeholder="Enter description" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="Role" render={({field}) => (
              <FormItem>
              <Label>Role</Label>
              <Input placeholder="Enter Role" {...field}/> 
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="technologies" render={({field}) => (
              <FormItem>
              <Label>Technologies</Label>
              <Input placeholder="Enter Technologies" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="projectLink" render={({field}) => (
              <FormItem>
              <Label>Project Link</Label>
              <Input placeholder="Enter Project Link" {...field}/>
            </FormItem>
            )}>
            </FormField>
            <FormField control={formdata.control} name="projectGithub" render={({field}) => (
              <FormItem>
              <Label>Project Github</Label>
              <Input placeholder="Enter Project Github" {...field}/>
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
