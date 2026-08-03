import useFilter from "@/lib/hooks/useFilter"
import {
    enumDefaultValueFromFilter,
    handleEnumFilterInput,
    handleStringFilterInput,
    pItemFilterExpand,
    pItemFilterMinimize,
    stringDefaultValueFromFilter
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { pItemPlans, pItemRarities, pItemSources } from "@/lib/data/p-item"

export default function PItemFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: pItemFilterExpand, minimize: pItemFilterMinimize })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Items</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={stringDefaultValueFromFilter(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                title={"Rarity"}
                data={pItemRarities}
                defaultValue={enumDefaultValueFromFilter(filter.rarity)}
                onChange={v => handleEnumFilterInput(setFilter, "rarity", v)}
            />
            {/*<NumberFilterInput*/}
            {/*    title={"Unlocking Level"}*/}
            {/*    defaultValue={numberDefaultValueFromFilter(filter.unlockLevel)}*/}
            {/*    onChange={v => handleNumberFilterInput(setFilter, "unlockLevel", v)}*/}
            {/*/>*/}
            {/*seems useless atm?*/}
            <EnumFilterInput
                title={"Plan"}
                data={pItemPlans}
                defaultValue={enumDefaultValueFromFilter(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
            <EnumFilterInput
                title={"Item Source"}
                data={pItemSources}
                defaultValue={enumDefaultValueFromFilter(filter.source)}
                onChange={v => handleEnumFilterInput(setFilter, "source", v)}
            />
        </FilterWidgetWrapper>
    )
}
