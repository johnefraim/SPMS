'use client' 
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { register } from '@/app/api/authService';
import { redirect } from "next/navigation"
import { RegistrationAlert } from './registrationAlert';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last Name must be at least 2 characters.' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export function RegistrationComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alert, setAlert] = useState(false);
  const role = 'STUDENT';
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function Submit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      console.log(values);
      const response = await register(values.firstName, values.lastName, values.email, values.password, role);
      form.reset();
      if(response.status == 200){
        setAlert(true);
        router.replace('/');
      }

    } catch (error: any) {
      console.error('Registration failed:', error);
      setErrorMessage(error.message);
    }
  }

  return (
    <Form {...form}>
      {alert && <RegistrationAlert/>}
      <form onSubmit={form.handleSubmit(Submit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="first name" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="last name" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Email" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={showPassword ? 'text' : 'password'} placeholder="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={showPassword ? 'text' : 'password'} placeholder="confirm password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPassword">Show</label>
          </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex items-center justify-between">
          <Button type="submit" variant="default">
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
