"use client"

import { useState } from "react"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface UserActionOption {
  value: string
  label: string
  action: (userID: string) => void
  icon?: React.ReactNode 
}

interface UserActionMenuProps {
  options: UserActionOption[]
  userID: string
}

export function UserActionMenu({ options, userID }: UserActionMenuProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-center text-sm p-0 w-7 h-7 items-center">
          <EllipsisVertical strokeWidth={1.25} className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-min p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="flex items-center gap-1.5 whitespace-nowrap"
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setValue(option.value === value ? "" : option.value)
                    setOpen(false)
                    option.action(userID)
                  }}
                >
                  {option.icon} {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
