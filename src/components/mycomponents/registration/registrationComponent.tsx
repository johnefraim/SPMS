'use client'
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link  from "next/link"
import {Form,FormControl,FormField,FormItem,} from "@/components/ui/form"

const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2,{
        message: "Last Name must be 8 characters"
    }),
    email: z.string().email(),
    password: z.string().min(8,{
        message: "Password must be 8 characters"
    }),
    confirmPassword: z.string().min(8,{
        message: "Password must be 8 characters"
    })
    })



export function RegistrationComponent() {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('STUDENT');

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        try {
            console.log(values);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }



    return (
        <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                    
                  <FormControl>
                    <Input type='text' placeholder="First Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({field}) =>(
                <FormItem>
                    <FormControl>
                    <Input type="text" placeholder="Last Name" {...field}/>
                  </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({field}) =>(
                <FormItem>
                    <FormControl>
                    <Input type="text" placeholder="Email" {...field}/>
                  </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field}) =>(
                <FormItem>
                    <FormControl>
                    <Input type="password" placeholder="Password" {...field}/>
                  </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) =>(
                <FormItem>
                    <FormControl>
                    <Input type="password" placeholder="confirm Password" {...field}/>
                  </FormControl>
                </FormItem>
            )}
            />
            <Button variant={'default'} type="submit" className=" hover:bg-gray-300 flex">
                Register</Button>
          </form>
        </Form>
        </>
    );
}