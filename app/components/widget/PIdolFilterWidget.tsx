import useFilter from "@/lib/hooks/useFilter"
import {
    booleanDefaultValueFromFilter,
    enumDefaultValueFromFilter,
    handleBooleanFilterInput,
    handleEnumFilterInput,
    handleStringFilterInput,
    pIdolFilterExpand,
    pIdolFilterMinimize,
    stringDefaultValueFromFilter
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { pIdolFlagKeys, pIdolFlags, pIdolPlans, pIdolRarities } from "@/lib/data/p-idol"
import CharacterFilterInput from "@/components/widget/primitives/CharacterFilterInput"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"

export default function PIdolFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: pIdolFilterExpand, minimize: pIdolFilterMinimize })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Idols</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={stringDefaultValueFromFilter(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                data={pIdolRarities}
                title={"Rarity"}
                defaultValue={enumDefaultValueFromFilter(filter.rarity)}
                onChange={v => handleEnumFilterInput(setFilter, "rarity", v)}
            />
            <EnumFilterInput
                data={pIdolPlans}
                title={"Plan"}
                defaultValue={enumDefaultValueFromFilter(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
            <CharacterFilterInput
                title={"Character"}
                defaultValue={enumDefaultValueFromFilter(filter.character)}
                onChange={v => handleEnumFilterInput(setFilter, "character", v)}
            />
            <BooleanFilterInput
                data={pIdolFlags}
                title={"Others"}
                defaultValue={booleanDefaultValueFromFilter(filter, pIdolFlagKeys)}
                onChange={v => handleBooleanFilterInput(setFilter, pIdolFlagKeys, v)}
            />
        </FilterWidgetWrapper>
    )
}
