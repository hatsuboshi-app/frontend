import { FilterInputProps } from "@/lib/util/types"
import React, { useEffect, useState } from "react"

export default function StringFilterInput({ defaultValue, onChange, title }: FilterInputProps<string>) {
    const [value, setValue] = useState(defaultValue ?? "")

    useEffect(() => {
        onChange?.(value)
    }, [value])

    return (
        <div className={"flex flex-col"}>
            {title && <label className={"sm uppercase font-normal tracking-wider text-secondary-dark mb-1"} htmlFor={title}>{title}</label>}
            <div className={"relative h-max w-full flex"}>
                <input
                    id={title}
                    value={value}
                    autoComplete={"off"}
                    placeholder={"Search"}
                    onChange={e => setValue(e.target.value)}
                    className={`
                        flex-grow rounded-hatsuboshi p-text-element sm font-normal placeholder-secondary-dark hover:outline-border-hover-dark transition-colors
                        outline focus:outline-accent
                        ${value !== "" ? "outline-accent" : "outline-border-dark"}
                    `}
                />
                <button
                    onClick={_ => setValue("")}
                    className={`
                        ${value !== '' ? 'block' : 'hidden'}
                        absolute right-0 h-full aspect-square sm text-secondary-dark
                        hover:text-primary-dark hover:cursor-pointer transition-colors 
                    `}
                >
                    x
                </button>
            </div>
        </div>
    )
}