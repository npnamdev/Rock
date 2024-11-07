"use client"

import * as React from "react"
import { Wrench } from "lucide-react"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./ui/button"

interface ActionOption {
    value: string
    label: string
    action: () => void
    icon?: React.ReactNode
}

interface ActionBtnProps {
    label: string
    options: ActionOption[]
    selectedUsers: User[]
}

export function ActionBtn({ label, options, selectedUsers }: ActionBtnProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>("inactive")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={selectedUsers.length <= 0}
                    variant="outline"
                    className="font-semibold text-[13.5px] flex gap-2 px-2"
                >
                    <Wrench size={16} strokeWidth={1.5} />
                    {label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {options?.map((status) => (
                                <CommandItem
                                    className="whitespace-nowrap flex items-center gap-2 font-medium cursor-pointer w-full"
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        status.action()
                                    }}
                                >
                                    {status.icon}
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
