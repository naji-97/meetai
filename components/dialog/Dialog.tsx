
"use client"
import React from 'react'
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"
import { 
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
 } from "../ui/drawer"
 import { useIsMobile } from '@/hooks/use-mobile'

 interface ResponsiveDialogProps {
     title: string  
     description: string
     children: React.ReactNode
     open: boolean
     onOpenChange: (open: boolean) => void
 }
const ResponsiveDialog = ({title, description, children, open, onOpenChange}: ResponsiveDialogProps) => {
    const isMoblie = useIsMobile()
    if (isMoblie) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                {children}
                </div>
                </DrawerContent>
            </Drawer>
        )
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
              {children}
        </DialogContent>
    </Dialog>
  )
}

export default ResponsiveDialog