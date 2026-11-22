import useFilter from "@/lib/hooks/useFilter"
import {
    decodePDrinkFilter,
    encodePDrinkFilter,
    getEnumFilterDefaultValue,
    getNumberFilterDefaultValue,
    getStringFilterDefaultValue,
    handleEnumFilterInput,
    handleNumberFilterInput,
    handleStringFilterInput
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"
import { rarityMetadata } from "@/lib/metadata/enum/rarity"
import { planMetadata } from "@/lib/metadata/enum/plan"

export default function PDrinkFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: decodePDrinkFilter, minimize: encodePDrinkFilter })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Drinks</p>

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

            <NumberFilterInput
                title={"Unlocking Level"}
                defaultValue={getNumberFilterDefaultValue(filter.unlockLevel)}
                onChange={v => handleNumberFilterInput(setFilter, "unlockLevel", v)}
            />

            <EnumFilterInput
                title={"Plan"}
                data={planMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
        </FilterWidgetWrapper>
    )
}
