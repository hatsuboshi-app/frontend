import { EnumData, FilterInputProps } from "@/lib/util/types"
import React, { useEffect, useState } from "react"
import FilterButton from "@/components/input/FilterButton"
import useDebouncer from "@/lib/hooks/useDebouncer"

export default function BooleanFilterInput<T extends string>({ defaultValue, onChange, title, data }: FilterInputProps<Partial<Record<T, boolean>>> & { data: EnumData<T>[] }) {
    const [flags, setFlags] = useState<Partial<Record<T, boolean>>>(defaultValue ?? {})
    const [debouncedFlags, _] = useDebouncer(flags)

    const handleClick = (val: T) => {
        setFlags(f => {
            const newF = { ...f }
            if (newF[val] !== undefined) {
                if (newF[val] === true) {
                    newF[val] = false
                } else {
                    delete newF[val]
                }
            } else {
                newF[val] = true
            }
            return newF
        })
    }

    useEffect(() => {
        onChange?.(debouncedFlags)
    }, [debouncedFlags])

    return (
        <div className={"flex flex-col"}>
            {title && <p className={"form-label sm"}>{title}</p>}
            <div className={"flex flex-row flex-wrap gap-1.5"}>
                {data.map((d, i) => <FilterButton
                    data={d}
                    key={i}
                    onClick={() => handleClick(d.value)}
                    boolValue={flags[d.value]}
                />)}
            </div>
        </div>
    )
}