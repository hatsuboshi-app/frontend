import { EnumData, FilterInputProps } from "@/lib/util/types"
import React, { useEffect, useState } from "react"
import FilterButton from "@/components/input/FilterButton"
import useDebouncer from "@/lib/hooks/useDebouncer"

export default function EnumFilterInput<T>({ defaultValue, onChange, title, data }: FilterInputProps<T[]> & { data: EnumData<T>[] }) {
    const [selected, setSelected] = useState<T[]>(defaultValue ?? [])
    const [debouncedSelected, _] = useDebouncer(selected)

    const handleSelect = (val: T) => {
        if (selected.includes(val)) {
            setSelected(s => s.filter(v => v !== val))
        } else {
            setSelected(s => [...s, val])
        }
    }

    useEffect(() => {
        onChange?.(debouncedSelected)
    }, [debouncedSelected])

    return (
        <div className={"flex flex-col"}>
            {title && <p className={"form-label sm"}>{title}</p>}
            <div className={"flex flex-row flex-wrap gap-1.5"}>
                {data.map((d, i) => <FilterButton
                    data={d}
                    key={i}
                    onClick={() => handleSelect(d.value)}
                    isSelected={selected.length !== 0 ? selected.includes(d.value) : undefined}
                />)}
            </div>
        </div>
    )
}