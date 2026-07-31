import { FilterInputProps } from "@/lib/util/types"
import React from "react"
import DualRangeSlider from "@/components/input/DualRangeSlider"
import { MAX_P_LEVEL } from "@/lib/data/consts"

export default function NumberFilterInput({ defaultValue, onChange, title }: FilterInputProps<{ gte?: number, lte?: number }>) {
    const [defaultMin, defaultMax] = [0, MAX_P_LEVEL]
    const handleSliderChange = ((v: [number, number]) => {
        const [gte, lte] = v
        onChange?.({
            gte: gte !== defaultMin ? gte : undefined,
            lte: lte !== defaultMax ? lte : undefined
        })
    })

    return (
        <div className={"flex flex-col"}>
            {title && <p className={"sm uppercase font-normal tracking-wider text-secondary-dark mb-1"}>{title}</p>}
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