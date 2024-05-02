

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
// import { updateProject } from "@/app/api/projectAPI"

interface Project {
    Id: number;
    projectImage: string;
    projectTitle: string;
    description: string;
    Role: string;
    technologies: string;
    projectLink: string;
    projectGithub: string;
  }
  

interface CreateProjectDialogProps {
  onClick?: () => void;
  project: Project;
  refreshPortfolioList: () => void;
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

export function EditProjectDialog({ onClick, project, refreshPortfolioList }: CreateProjectDialogProps) {

    const formdata = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            projectImage: project.projectImage,
            projectTitle: project.projectTitle,
            description: project.description,
            Role: project.Role,
            technologies: project.technologies,
            projectLink: project.projectLink,
            projectGithub: project.projectGithub,
        },
    });

  async function onSubmit(formvalue: z.infer<typeof schema>){
    // try {
      
    //   const response = await updateProject(
    //     project.Id,
    //     formvalue.projectTitle,
    //     formvalue.description,
    //     formvalue.Role,
    //     formvalue.technologies,
    //     formvalue.projectLink,
    //     formvalue.projectGithub
    //   );
    //   const { data } = response;
    //   console.log(data);
    //   refreshPortfolioList();
    //   formdata.reset();
    // } catch (error) {
    //   if (error instanceof z.ZodError) {
    //     console.log('Validation errors:', error.errors);
    //   }
    // }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} onClick={onClick}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription>Edit important information</DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
        <Form {...formdata}>
          <form onSubmit={formdata.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={formdata.control} name="projectImage" render={({field}) => (
                <FormItem>
                    <Label>Images</Label>
                    <Input type="file" multiple onChange={(e) => field.onChange(e.target.files)} />
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
  );
}
