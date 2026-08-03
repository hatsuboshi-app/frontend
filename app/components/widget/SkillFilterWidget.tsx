import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { skillCategories, skillFlagKeys, skillFlags, skillPlans, skillRarities, skillSources } from "@/lib/data/skill"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import {
    booleanDefaultValueFromFilter,
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
import useFilter from "@/lib/hooks/useFilter"

export default function SkillFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: skillFilterExpand, minimize: skillFilterMinimize })

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
                defaultValue={booleanDefaultValueFromFilter(filter, skillFlagKeys)}
                onChange={v => handleBooleanFilterInput(setFilter, skillFlagKeys, v)}
            />
        </FilterWidgetWrapper>
    )
}
