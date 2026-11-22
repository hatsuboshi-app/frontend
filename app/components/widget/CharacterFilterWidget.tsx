import useFilter from "@/lib/hooks/useFilter"
import {
    decodeCharacterFilter,
    encodeCharacterFilter,
    getBooleanFilterDefaultValue,
    getStringFilterDefaultValue,
    handleBooleanFilterInput,
    handleStringFilterInput
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"
import { characterMetadata } from "@/lib/metadata/resource/character"

export default function CharacterFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: decodeCharacterFilter, minimize: encodeCharacterFilter })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Characters</p>

            <StringFilterInput
                title={"Name"}
                defaultValue={getStringFilterDefaultValue(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />

            <BooleanFilterInput
                title={"Others"}
                data={characterMetadata.flags!}
                defaultValue={getBooleanFilterDefaultValue(filter, characterMetadata.flags!.map(i => i.value))}
                onChange={v => handleBooleanFilterInput(setFilter, characterMetadata.flags!.map(i => i.value), v)}
            />
        </FilterWidgetWrapper>
    )
}
