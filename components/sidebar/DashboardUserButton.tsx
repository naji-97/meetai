import { authClient } from '@/lib/auth-client'
import { ChevronDownIcon, CreditCardIcon, Loader, LogOutIcon } from 'lucide-react';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import GeneratedAvatar from '../generated-avatar/GeneratedAvatar';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile()
    const { data, isPending } = authClient.useSession();
    if (isPending || !data) {
        return <div className='flex items-center justify-center'><Loader className="animate-spin" /></div>
    }

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        });
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between
          bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2'>{
                        data?.user.image ? (
                            <Avatar>
                                <AvatarImage src={data.user.image} />
                            </Avatar>
                        ) : (
                            <GeneratedAvatar seed={data.user.name} varient='initials' className='size-9 mr-3' />
                        )
                    }
                    <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                        <p className='text-sm truncate w-full'>{data.user.name}</p>
                        <p className='text-sm truncate w-full'>{data.user.email}</p>
                    </div>
                    <ChevronDownIcon className='size-4 shrink-0' />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>

                        <Button
                            variant={'outline'}
                            onClick={onLogout}>
                            <CreditCardIcon className='size-4 mr-2' />
                            Billing
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={onLogout}>
                            <LogOutIcon className='size-4 mr-2' />
                            Logout
                        </Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between
          bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2'>{
                    data?.user.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar seed={data.user.name} varient='initials' className='size-9 mr-3' />
                    )
                }
                <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
                    <p className='text-sm truncate w-full'>{data.user.name}</p>
                    <p className='text-xs truncate w-full text-muted-foreground'>{data.user.email}</p>
                </div>
                <ChevronDownIcon className='size-4 shrink-0' />
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' side='right' className='w-72'>
                <DropdownMenuLabel>
                    <div className='flex flex-col gap-1'>
                        <span className='font-medium truncate'>{data.user.name}</span>
                        <span className='text-sm font-normal text-muted-foreground truncate'>{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer dlex items-center justify-between'>Billing
                    <CreditCardIcon className='size-4' />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onLogout}
                    className='cursor-pointer dlex items-center justify-between'>
                    Logout
                    <LogOutIcon className='size-4' />
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton