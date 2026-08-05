import useFilter from "@/lib/hooks/useFilter"
import {
    enumDefaultValueFromFilter,
    handleEnumFilterInput,
    handleNumberFilterInput,
    handleStringFilterInput,
    numberDefaultValueFromFilter,
    pDrinkFilterExpand,
    pDrinkFilterMinimize,
    stringDefaultValueFromFilter
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { pDrinkPlans, pDrinkRarities } from "@/lib/data/p-drink"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"

export default function PDrinkFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: pDrinkFilterExpand, minimize: pDrinkFilterMinimize })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Drinks</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={stringDefaultValueFromFilter(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                title={"Rarity"}
                data={pDrinkRarities}
                defaultValue={enumDefaultValueFromFilter(filter.rarity)}
                onChange={v => handleEnumFilterInput(setFilter, "rarity", v)}
            />
            <NumberFilterInput
                title={"Unlocking Level"}
                defaultValue={numberDefaultValueFromFilter(filter.unlockLevel)}
                onChange={v => handleNumberFilterInput(setFilter, "unlockLevel", v)}
            />
            <EnumFilterInput
                title={"Plan"}
                data={pDrinkPlans}
                defaultValue={enumDefaultValueFromFilter(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
        </FilterWidgetWrapper>
    )
}
