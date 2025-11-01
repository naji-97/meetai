'use client'
import React from 'react'
import { useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'
import DashboardCommand from './DashboardCommand'

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar()
    const [commandOpen, setCommandOpen] = React.useState(false)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setCommandOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
        <div className='flex px-4 gap-x-2 items-center py-3 border-b bg-background'>
            <Button className='size-9' variant="outline" onClick={toggleSidebar} data-sidebar="trigger">
                {
                    (state === "collapsed" || isMobile) ? <PanelLeftIcon className='size-4' /> : <PanelLeftCloseIcon className='size-4' />
                }
                {/* <PanelLeftIcon /> */}
            </Button>
            <Button className='h-9 w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground'
            variant={'outline'}
            size={"sm"}
                onClick={() => {setCommandOpen((open) => !open) }}>
                    <SearchIcon/> Search
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'><span className='text-xs'>&#8984;</span>K</kbd>
            </Button>
        </div>
        </>
    )
}

export default DashboardNavbar