import { SkillFilterOptions } from "@hatsuboshi/types"
import React, { useState } from "react"

type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

function handleStringFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: string) {
    setFilter(f => {
        const newFilter = { ...f } as T
        (newFilter as any)[field] = value ? { type: "Search", search: value } : undefined
        return newFilter
    })
}

export default function SkillSearchWidget() {
    const [filter, setFilter] = useState<SkillFilterOptions>({})

    return (
        <>
            <StringFilterInput onValueSet={v => handleStringFilterInput(setFilter, "name", v)}/>
            <p>{JSON.stringify(filter)}</p>
        </>
    )
}

function StringFilterInput({ defaultValue, onValueSet }: { defaultValue?: string, onValueSet: (v: string) => void }) {
    return (
        <>
            <input className={"focus:outline-none"} value={defaultValue} onChange={e => onValueSet(e.target.value)}/>
        </>
    )
}

// function NumberFilterInput({ defaultValue, onValueSet }: { defaultValue?: { gte?: number, lte?: number } })