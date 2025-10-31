"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { data: session, isPending: isLoading } = authClient.useSession();
    const signOut = async () => {
        try {
            const data = await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/sign-in");
                        
                    }
                }
            })
            

        } catch (error) {
            console.log(error);

        }
    }
    if (isLoading) {
        return (
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Button size="lg" onClick={signOut}>
                LogOut
            </Button>
            <p>Hello, {session?.user?.name} </p>
        </div>
    );
}
