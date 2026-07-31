import { SkillFilterOptions } from "@hatsuboshi/types"
import React, { useState } from "react"
import { ReactSetter } from "@/lib/util/types"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { skillCategories, skillPlans, skillRarities, skillSources } from "@/lib/data/skill"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"

function handleStringFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: string) {
    setFilter(f => {
        const newFilter = { ...f } as T
        (newFilter as any)[field] = value ? { type: "Search", search: value } : undefined
        return newFilter
    })
}

function handleNumberFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: { gte?: number, lte?: number }) {
    setFilter(f => {
        const newFilter = { ...f } as T
        (newFilter as any)[field] = (value.gte !== undefined || value.lte !== undefined) ? value : undefined
        return newFilter
    })
}

function handleEnumFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: any[]) {
    setFilter(f => {
        const newFilter = { ...f } as T
        (newFilter as any)[field] = value.length !== 0 ? { include: value } : undefined
        return newFilter
    })
}

export default function SkillFilterWidget() {
    const [filter, setFilter] = useState<SkillFilterOptions>({})

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Skills</p>
            <StringFilterInput title={"Name"} onChange={v => handleStringFilterInput(setFilter, "name", v)}/>
            <EnumFilterInput title={"Rarity"} data={skillRarities} onChange={v => handleEnumFilterInput(setFilter, "rarity", v)}/>
            <NumberFilterInput title={"Unlocking Level"} onChange={v => handleNumberFilterInput(setFilter, "unlockLevel", v)}/>
            <EnumFilterInput title={"Plan"} data={skillPlans} onChange={v => handleEnumFilterInput(setFilter, "plan", v)}/>
            <EnumFilterInput title={"Category"} data={skillCategories} onChange={v => handleEnumFilterInput(setFilter, "category", v)}/>
            <EnumFilterInput title={"Card Source"} data={skillSources} onChange={v => handleEnumFilterInput(setFilter, "source", v)}/>
        </FilterWidgetWrapper>
    )
}
