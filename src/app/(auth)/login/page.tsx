"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import envConfig from "@/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/app/AppProvider"
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email("Type a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(255),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const { setSessionToken } = useAppContext()
  const formMethods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw { status: response.status, payload };
      }

      Cookies.set("sessionToken", payload.data.token, { expires: 1 }); // expires in 7 days
      
      // Login successful
      toast({
        variant: "default",
        title: "Logged in successfully",
      });

      router.push('/');

      return payload;
    } catch (error: any) {
      const errors = error.payload.errors as { field: string; message: string }[];
      const status = error.status as number;

      if (status === 422) {
        errors.forEach((error) => {
          formMethods.setError(error.field as 'email' | 'password', {
            type: 'server',
            message: error.message,
          });
        });
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.payload.message
        });
      } 
      else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.payload.message
        });
      }
    }
  };

  return (
    <div style={{ width: '30%', margin: '50px' }}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={formMethods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  Your password must be at least 6 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="!mt-8 w-full">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
