"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ComboboxOption { value: string; label: string }
interface ComboboxDemoProps { data: ComboboxOption[]; optionDefault?: string }

export function ComboboxDemo({ data, optionDefault = "" }: ComboboxDemoProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(optionDefault)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] whitespace-nowrap justify-between px-3"
                >
                    {value
                        ? data.find((item) => item.value === value)?.label
                        : "Chọn một tùy chọn..."}
                    <ChevronsUpDown className="opacity-50 w-2 h-2" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] whitespace-nowrap p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((item) => (
                                <CommandItem
                                    className="px-2 whitespace-nowrap"
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto w-3 h-3",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
