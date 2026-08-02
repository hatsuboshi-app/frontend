import { FilterInputProps } from "@/lib/util/types"
import React, { useCallback, useEffect, useState } from "react"
import DualRangeSlider from "@/components/input/DualRangeSlider"
import { INPUT_DEBOUNCE_TIME, MAX_P_LEVEL } from "@/lib/data/consts"
import useDebouncer from "@/lib/hooks/useDebouncer"

export default function NumberFilterInput({ defaultValue, onChange, title }: FilterInputProps<{ gte?: number, lte?: number }>) {
    const [defaultMin, defaultMax] = [0, MAX_P_LEVEL]
    const [range, setRange] = useState<{ gte?: number, lte?: number }>({})
    const [debouncedRange, _] = useDebouncer(range, INPUT_DEBOUNCE_TIME)

    const handleSliderChange = useCallback((v: [number, number]) => {
        const [gte, lte] = v
        setRange({
            gte: gte !== defaultMin ? gte : undefined,
            lte: lte !== defaultMax ? lte : undefined
        })
    }, [setRange])

    useEffect(() => {
        onChange?.(debouncedRange)
    }, [debouncedRange])

    return (
        <div className={"flex flex-col"}>
            {title && <p className={"form-label sm"}>{title}</p>}
            <DualRangeSlider
                defaultValue={[defaultValue?.gte ?? defaultMin, defaultValue?.lte ?? defaultMax]}
                min={defaultMin}
                max={defaultMax}
                onChange={handleSliderChange}
                formatLabel={v => `Lv. ${v}`}
            />
        </div>
    )
}