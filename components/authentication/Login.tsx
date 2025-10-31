"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppLogoIcon } from "./AppLogoIcon";
import Icons from "./Icons";
import { authClient } from "@/lib/auth-client";

// Define the validation schema with Zod
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

// Type for the form values
export type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // Initialize react-hook-form with zod validation
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Form submission handler
    async function onSubmit(values: LoginFormValues) {
        setIsLoading(true);

        try {
            const result = await authClient.signIn.email({
                email: values.email,
                password: values.password,
                callbackURL: "/",
                rememberMe: false

            }, {

                onSuccess: (data) => {

                    router.push("/");
                },
                onError: (error) => {
                    toast.error(error.error?.message);
                }
            }
            )

            console.log("Result", result)
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            });
            // console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const socialSignin = async (provider: string) => {
        setIsLoading(true);
        try {
            
            authClient.signIn.social({
                provider: provider
            }, {
                onSuccess: (data) => {
                    router.push("/");
                },
                onError: (error) => {
                    toast.error(error.error?.message);
                }
            })
        } catch (error) {
            
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div className="flex flex-col items-center">
                        <Link href="/" aria-label="go home">
                            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">
                            Sign In to Meet.AI
                        </h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button type="button" variant="outline" onClick={() => socialSignin("google")}>
                            <Icons.google />
                            <span>Google</span>
                        </Button>
                        <Button type="button" variant="outline" onClick={() => socialSignin("github")}>
                            <Icons.gitHub />
                            <span>Github</span>
                        </Button>
                    </div>

                    <hr className="my-4 border-dashed" />

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="block text-sm">Email</FormLabel>
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
                                    <FormItem className="space-y-0.5">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-title text-sm">
                                                Password
                                            </FormLabel>
                                            <Button asChild variant="link" size="sm">
                                                <Link
                                                    href="#"
                                                    className="link intent-info variant-ghost text-sm"
                                                >
                                                    Forgot your Password?
                                                </Link>
                                            </Button>
                                        </div>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don&apos;t have an account?
                        <Button asChild variant="link" className="ml-3 px-2">
                            <Link href="/sign-up">Create account</Link>
                        </Button>
                    </p>
                </div>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 pb-4 pt-1">
                    {/* <p> */}
                    By clicking sign in, you agree to our{" "}
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
        </section>
    );
}



