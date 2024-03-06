'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { LogIn, User, Lock } from "lucide-react"
import {Form,FormControl,FormField,FormItem,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authenticate } from "@/app/api/route"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link  from "next/link"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2,{
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
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles the form submission for the login form.
     *
     * @param values - The form values.
     * @returns void
     */
    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
      try {
        const response = await authenticate(values.username, values.password);
        const { access_token, name } = response.data; 
        localStorage.setItem('token', access_token);
        localStorage.setItem('name', name);
        setUsername('');
        setPassword('');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token && token !== "undefined" && token !== "null") {
            redirect('/studentdashboard');
        }
    }, [token]);

    return (
        <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-row">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                    <User />
                  <FormControl>
                    <Input placeholder="Email" {...field} className="border-black"/>
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
                    <Input type="password" placeholder="Password" {...field} className="border-black"/>
                  </FormControl>
                </FormItem>
            )}
            />
            <Link className="text-sm text-blue-500 grid space-y-2" href={'/forgotpassword'}>Forgot password?</Link>
            <Button variant={'ghost'} type="submit" className=" hover:bg-orange-500">
                <LogIn size={16} />
                Login</Button>
          </form>
        </Form>
        </section>
      )
  }
