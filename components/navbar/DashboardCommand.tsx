import React, { Dispatch, SetStateAction } from 'react'
import { CommandDialog, CommandInput, CommandResponsiveDialog, CommandSeparator, CommandShortcut } from '../ui/command'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from 'cmdk';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}
const DashboardCommand = ({open, setOpen}: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
          <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                  <CommandItem>
                      {/* <Calendar /> */}
                      <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                      {/* <Smile /> */}
                      <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                      {/* <Calculator /> */}
                      <span>Calculator</span>
                  </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                  <CommandItem>
                      {/* <User /> */}
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                      {/* <CreditCard /> */}
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                      {/* <Settings /> */}
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
              </CommandGroup>
          </CommandList>
    </CommandResponsiveDialog>
  )
}

export default DashboardCommand