import DashboardNavbar from '@/components/navbar/DashboardNavbar'
import DashboardSidebar from '@/components/sidebar/DashboardSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar/>
            <main className='flex flex-col h-screen w-screen bg-yellow-300'>
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layout