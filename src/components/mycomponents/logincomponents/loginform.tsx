'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { LogIn, User, Lock, Ghost } from "lucide-react"
import {Form,FormControl,FormField,FormItem,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authenticate, getRole, getToken, setUser } from "@/app/api/authService"
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
    const [error, setError] = useState<string | null>(null)
    
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
        setUsername('');
        setPassword('');
        const response = await authenticate(values.username, values.password);
        const { access_token, name, role } = response.data; 
        setUser(access_token, name, role);
        
      } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      }
    }

    const token = getToken();
    const userRole = getRole();
    useEffect(() => {
        if(token){
          if(userRole === 'STUDENT'){
            redirect('/dashboard/student');
          }
          else if(userRole === 'ADMIN'){
            redirect('/dashboard/dean');
          }
          else if(userRole === 'MANGER'){
            redirect('dashboard/program-head');
          }
          else{
            redirect('/');
          }
        }

    }, [token, userRole]);

    return (
        <section className="w-full">
          {error && <p className="text-red-500">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                    <User className="text-[#205375]"/>
                  <FormControl>
                    <Input required  placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field}) =>(
                <FormItem>
                    <Lock className="text-[#205375]"/>
                    <FormControl>
                    <Input required type="password" placeholder="Password" {...field}/>
                  </FormControl>
                </FormItem>
            )}
            />
            <Link className="text-sm text-[#205375] grid space-y-2" href={'/forgotpassword'}>Forgot password?</Link>
            <Button variant={'default'} type="submit" className=" hover:bg-gray-300">
                <LogIn size={16}/>
                Login</Button>
          </form>
        </Form>
        </section>
      )
  }
