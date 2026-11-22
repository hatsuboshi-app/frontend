import useFilter from "@/lib/hooks/useFilter"
import {
    decodePItemFilter,
    encodePItemFilter,
    getEnumFilterDefaultValue,
    getStringFilterDefaultValue,
    handleEnumFilterInput,
    handleStringFilterInput
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { pItemSourceMetadata } from "@/lib/metadata/enum/pItemSource"
import { planMetadata } from "@/lib/metadata/enum/plan"
import { rarityMetadata } from "@/lib/metadata/enum/rarity"

export default function PItemFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: decodePItemFilter, minimize: encodePItemFilter })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Items</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={getStringFilterDefaultValue(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                title={"Rarity"}
                data={rarityMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.rarity)}
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
                data={planMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
            <EnumFilterInput
                title={"Item Source"}
                data={pItemSourceMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.source)}
                onChange={v => handleEnumFilterInput(setFilter, "source", v)}
            />
        </FilterWidgetWrapper>
    )
}
