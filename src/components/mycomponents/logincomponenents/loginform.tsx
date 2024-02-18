'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { LogIn, User, Lock } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8,{
        message: "Password must be 8 characters"
    })
  })

  export function LoginForm() {
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })
   
    
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
        <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                    <User />
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field}) =>(
                <FormItem>
                    <Lock />
                    <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
            )}
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-800">
                <LogIn size={16} />
                Login</Button>
          </form>
        </Form>
        </section>
      )
  }
