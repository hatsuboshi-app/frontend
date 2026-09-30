import { EnumData } from "@/lib/util/types"
import React from "react"

type FilterButtonProps<T> = {
    data: EnumData<T>
    onClick?: () => void
    className?: string
    boolValue?: boolean
    isSelected?: boolean
}

export default function FilterButton<T>({ data, onClick, className, boolValue, isSelected }: FilterButtonProps<T>) {
    if (boolValue !== undefined && isSelected !== undefined) {
        throw new Error("FilterButton cannot have both boolValue & isSelected flags set.")
    }
    let styles
    if (boolValue !== undefined) {
        styles = boolValue
            ? "outline-green-600 hover:outline-green-600/80"
            : "outline-red-600 hover:outline-red-600/80"
    } else if (isSelected !== undefined) {
        styles = isSelected
            ? "outline-accent hover:outline-accent/80"
            : "outline-background-dark/0 bg-background-inset-dark shadow-inner text-secondary-dark hover:text-primary-dark hover:outline-border-hover-dark"
    } else {
        styles = "outline-border-dark hover:outline-border-hover-dark"
    }

    return (
        <button
            onClick={_ => onClick?.()}
            className={`
                sm font-normal p-button rounded-hatsuboshi outline relative
                hover:cursor-pointer transition-colors group
                ${styles} ${className}
            `}
        >
            { boolValue !== undefined && <span className={`absolute aspect-square h-3.5 rounded-full top-0 right-0 translate-x-1/4 -translate-y-1/4 transition-colors ${boolValue ? "bg-green-600 group-hover:bg-green-600/80" : "bg-red-600 group-hover:bg-red-600/80"} text-center align-middle text-[9px] font-black shadow`}>{boolValue ? "✔" : "✘"}</span>}
            {data.displayText}
        </button>
    )
}