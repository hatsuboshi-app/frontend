import useFilter from "@/lib/hooks/useFilter"
import {
    decodePIdolFilter,
    encodePIdolFilter,
    getBooleanFilterDefaultValue,
    getEnumFilterDefaultValue,
    getStringFilterDefaultValue,
    handleBooleanFilterInput,
    handleEnumFilterInput,
    handleStringFilterInput
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { pIdolMetadata } from "@/lib/metadata/resource/p-idol"
import CharacterFilterInput from "@/components/widget/primitives/CharacterFilterInput"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"
import { rarityMetadata } from "@/lib/metadata/enum/rarity"
import { pIdolPlanMetadata } from "@/lib/metadata/enum/pIdolPlan"

export default function PIdolFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: decodePIdolFilter, minimize: encodePIdolFilter })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Produce Idols</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={getStringFilterDefaultValue(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                data={rarityMetadata}
                title={"Rarity"}
                defaultValue={getEnumFilterDefaultValue(filter.rarity)}
                onChange={v => handleEnumFilterInput(setFilter, "rarity", v)}
            />
            <EnumFilterInput
                data={pIdolPlanMetadata}
                title={"Plan"}
                defaultValue={getEnumFilterDefaultValue(filter.plan)}
                onChange={v => handleEnumFilterInput(setFilter, "plan", v)}
            />
            <CharacterFilterInput
                title={"Character"}
                defaultValue={getEnumFilterDefaultValue(filter.character)}
                onChange={v => handleEnumFilterInput(setFilter, "character", v)}
            />
            <BooleanFilterInput
                data={pIdolMetadata.flags!}
                title={"Others"}
                defaultValue={getBooleanFilterDefaultValue(filter, pIdolMetadata.flags!.map(v => v.value))}
                onChange={v => handleBooleanFilterInput(setFilter, pIdolMetadata.flags!.map(v => v.value), v)}
            />
        </FilterWidgetWrapper>
    )
}
