"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { SVGAttributes, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
// import { registerUser } from "@/actions/register";
import { useRouter } from "next/navigation";
import Icons from "./Icons";
import { AppLogoIcon } from "./AppLogoIcon";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

// Define schema for form validation with Zod
const registerSchema = z.object({
    name: z.string().min(2, "Firstname must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Signup() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    // Initialize form with React Hook Form and Zod validation
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: RegisterFormValues) => {
        console.log(data);
        setIsSubmitting(true);

        try {
            const result = await authClient.signUp.email({
                ...data,
                callbackURL: "/",
            }, {
                onSuccess: (data) => {
                    toast.success("Success!", {
                        description: 'Account created successfully!',
                    });
                    // Optional: redirect to login page
                    router.push("/");
                },
                onError: (error) => {
                    toast.error("", { description: error.error?.message });
                }
            });
            console.log(result);

        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            });
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialSignup = async (provider: string) => {
        authClient.signIn.social({
            provider: provider
        }, {
            onSuccess: (data) => {
                console.log(data);
                // router.push("/");
            },
            onError: (error) => {
                toast.error(error.error?.message);
            }
        })
    };

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent ">
            <div className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div className="flex flex-col items-center">
                        <Link href="/" aria-label="go home">
                            <AppLogoIcon />
                        </Link>
                        <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                            Create a Meet.AI Account
                        </h1>
                        <p className="text-sm">Welcome! Create an account to get started</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button type="button" variant="outline">
                            <Icons.google onClick={() => socialSignup("google")} />
                            <span>Google</span>
                        </Button>
                        <Button type="button" variant="outline" onClick={() => socialSignup("github")}>
                            <Icons.gitHub />
                            <span>Github</span>
                        </Button>
                    </div>

                    <hr className="my-4 border-dashed" />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Creating Account..." : "Continue"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account?
                        <Button asChild variant="link" className="px-2 ml-3">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </p>
                </div>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 pb-4 pt-1">
                    {/* <p> */}
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                        Privacy Policy
                    </Link>
                    .
                    {/* </p> */}
                </div>
            </div>
            {/* <div>
                LOGO HERE
                <Image src={"/logo.png"} alt="logo" width={300} height={200}/>
            </div> */}
        </section>
    );
}
