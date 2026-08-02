import React, { useEffect, useState } from "react"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { skillCategories, skillFlagKeys, skillFlags, skillPlans, skillRarities, skillSources } from "@/lib/data/skill"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import {
    enumDefaultValueFromFilter,
    handleBooleanFilterInput,
    handleEnumFilterInput,
    handleNumberFilterInput,
    handleStringFilterInput,
    numberDefaultValueFromFilter,
    skillConsolidateRarity,
    skillDeconsolidateRarity,
    skillFilterExpand,
    skillFilterMinimize, stringDefaultValueFromFilter
} from "@/lib/util/functions"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"
import useThrottledCallback from "@/lib/hooks/useThrottledCallback"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string"
import useDebouncer from "@/lib/hooks/useDebouncer"
import { SEARCH_PARAM_FILTER } from "@/lib/data/consts"

export default function SkillFilterWidget() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const existingFilter = searchParams.get(SEARCH_PARAM_FILTER)
    const initialFilter = existingFilter ? skillFilterExpand(decompressFromEncodedURIComponent(existingFilter)) ?? {} : {}
    const [filter, setFilter] = useState(initialFilter)
    const [debouncedFilter, _] = useDebouncer(filter, 700)

    const throttledPushUrl = useThrottledCallback((params: URLSearchParams) => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, [pathname, router], 2000)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (Object.keys(debouncedFilter).length === 0) params.delete(SEARCH_PARAM_FILTER)
        else params.set(SEARCH_PARAM_FILTER, compressToEncodedURIComponent(skillFilterMinimize(debouncedFilter) ?? ""))
        if (params.toString() !== searchParams.toString()) throttledPushUrl(params)
    }, [debouncedFilter])

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Skills</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={stringDefaultValueFromFilter(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                title={"Rarity"}
                data={skillRarities}
                defaultValue={skillConsolidateRarity(enumDefaultValueFromFilter(filter.rarity) ?? [])}
                onChange={v => handleEnumFilterInput(setFilter, "rarity", skillDeconsolidateRarity(v))}
            />
            <NumberFilterInput
                title={"Unlocking Level"}
                defaultValue={numberDefaultValueFromFilter(filter.unlockLevel)}
                onChange={v => handleNumberFilterInput(setFilter, "unlockLevel", v)}
            />
            <EnumFilterInput
                title={"Plan"}
                data={skillPlans}
                defaultValue={enumDefaultValueFromFilter(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
            <EnumFilterInput
                title={"Category"}
                data={skillCategories}
                defaultValue={enumDefaultValueFromFilter(filter.category)}
                onChange={v => handleEnumFilterInput(setFilter, "category", v)}
            />
            <EnumFilterInput
                title={"Card Source"}
                data={skillSources}
                defaultValue={enumDefaultValueFromFilter(filter.source)}
                onChange={v => handleEnumFilterInput(setFilter, "source", v)}
            />
            <BooleanFilterInput
                title={"Others"}
                data={skillFlags}
                defaultValue={skillFlagKeys.reduce((a, v) => (filter[v] !== undefined ? { ...a, [v]: filter[v] as boolean } : a), {})}
                onChange={v => handleBooleanFilterInput(setFilter, skillFlagKeys, v)}
            />
        </FilterWidgetWrapper>
    );
}
