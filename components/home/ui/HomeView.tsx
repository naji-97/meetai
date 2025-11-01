"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const trpc = useTRPC();
    // const greeting = useQuery(trpc.hello.queryOptions({ text: 'world' }));
    const {data}= useQuery(trpc.hello.queryOptions({text:"world"}));
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            {data?.greeting}
        </div>
    );
}
