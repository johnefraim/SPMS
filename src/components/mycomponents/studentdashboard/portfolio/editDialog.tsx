

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
import { updatePortfolio } from "@/app/api/portfolioService"

interface Portfolio {
  id: number;
  portfolioTitle: string;
  description: string;
  category: string;
  tagsKeywords: string;
}

interface CreatePortfolioDialogProps {
  onClick?: () => void;
  portfolio: Portfolio;
  refreshPortfolioList: () => void;
}

const schema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.string(),
});

export function EditDialog({ onClick, portfolio, refreshPortfolioList }: CreatePortfolioDialogProps) {

  const formdata = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: portfolio.portfolioTitle,
      category: portfolio.category,
      description: portfolio.description,
      tags: portfolio.tagsKeywords,
    },
  });

  async function onSubmit(formvalue: z.infer<typeof schema>){
    try {
      
      const response = await updatePortfolio(
        portfolio.id,
        formvalue.title,
        formvalue.category,
        formvalue.description,
        formvalue.tags
      );
      const { data } = response;
      console.log(data);
      refreshPortfolioList();
      formdata.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Validation errors:', error.errors);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={onClick}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription>Edit important information</DialogDescription>
        </DialogHeader>
        <div className="grid items-center space-y-3">
          <Form {...formdata}>
            <form onSubmit={formdata.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={formdata.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <Input placeholder="Enter Portfolio Title" {...field} />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formdata.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Label>Category</Label>
                    <Input placeholder="Enter category" {...field} />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formdata.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <Input placeholder="Enter description" {...field} />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formdata.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <Label>Tags</Label>
                    <Input placeholder="Enter Tags/Keywords (comma separated)" {...field} />
                  </FormItem>
                )}
              ></FormField>
              <DialogFooter className="sm:justify-start">
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
