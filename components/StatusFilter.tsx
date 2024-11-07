"use client"

import * as React from "react"
import { ArrowDownUp } from "lucide-react"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface StatusOption {
    value: string
    label: string
    action: () => void
}

interface StatusFilterProps {
    label: string
    options?: StatusOption[]
}

export function StatusFilter({ label, options }: StatusFilterProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>("inactive")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="cursor-pointer flex items-center gap-1.5 hover:text-primary w-min whitespace-nowrap">
                    {label}
                    <ArrowDownUp size={14} strokeWidth={1.75} />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-min p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {options?.map((status) => (
                                <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        status.action()
                                    }}
                                >
                                    {status.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
