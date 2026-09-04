import { FilterInputProps } from "@/lib/util/types"
import React, { useEffect, useState } from "react"
import useDebouncer from "@/lib/hooks/useDebouncer"
import { INPUT_DEBOUNCE_TIME } from "@/lib/util/consts"

export default function StringFilterInput({ defaultValue, onChange, title }: FilterInputProps<string>) {
    const [value, setValue] = useState(defaultValue ?? "")
    const [debouncedValue, setValueInstantly] = useDebouncer(value, INPUT_DEBOUNCE_TIME)

    useEffect(() => {
        onChange?.(debouncedValue)
    }, [debouncedValue])

    return (
        <div className={"flex flex-col"}>
            {title && <label className={"form-label sm"} htmlFor={title}>{title}</label>}
            <div className={"relative h-max w-full flex"}>
                <input
                    id={title}
                    value={value}
                    autoComplete={"off"}
                    placeholder={"Search"}
                    onChange={e => setValue(e.target.value)}
                    className={`
                        w-full rounded-hatsuboshi p-button sm font-normal placeholder-secondary-dark transition-colors
                        outline focus:outline-accent min-w-0
                        ${value !== ""
                        ? "outline-accent hover:outline-accent/80"
                        : "outline-border-dark hover:outline-border-hover-dark"}
                    `}
                />
                <button
                    onClick={_ => {
                        setValue("")
                        setValueInstantly("")
                    }}
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