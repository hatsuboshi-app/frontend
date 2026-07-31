import { EnumData, FilterInputProps } from "@/lib/util/types"
import React, { useEffect, useState } from "react"

export default function EnumFilterInput<T>({ defaultValue, onChange, title, data }: FilterInputProps<T[]> & { data: EnumData<T>[] }) {
    const [selected, setSelected] = useState<T[]>(defaultValue ?? [])

    const handleSelect = (val: T) => {
        if (selected.includes(val)) {
            setSelected(s => s.filter(v => v !== val))
        } else {
            setSelected(s => [...s, val])
        }
    }

    useEffect(() => {
        onChange?.(selected)
    }, [selected])

    return (
        <div className={"flex flex-col"}>
            {title && <p className={"sm uppercase font-normal tracking-wider text-secondary-dark mb-1"}>{title}</p>}
            <div className={"flex flex-row flex-wrap gap-1.5"}>
                {data.map((d, i) => {
                    const isSelected = selected.includes(d.value)
                    return (
                        <button onClick={_ => handleSelect(d.value)} key={i} className={`
                            sm font-normal p-text-element rounded-hatsuboshi outline
                            hover:cursor-pointer hover:outline-accent transition-colors
                            ${selected.length !== 0
                                ? isSelected
                                    ? "outline-accent"
                                    : "outline-background-dark/0 bg-background-inset-dark shadow-inner text-secondary-dark  hover:text-primary-dark"
                                : "outline-border-dark"
                            }
                        `}>
                            {d.displayText}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}