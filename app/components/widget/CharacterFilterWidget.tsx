import useFilter from "@/lib/hooks/useFilter"
import {
    booleanDefaultValueFromFilter,
    characterFilterExpand,
    characterFilterMinimize,
    handleBooleanFilterInput,
    handleStringFilterInput,
    stringDefaultValueFromFilter
} from "@/lib/util/functions"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"
import { characterFlagKeys, characterFlags } from "@/lib/data/character"

export default function CharacterFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: characterFilterExpand, minimize: characterFilterMinimize })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Characters</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={stringDefaultValueFromFilter(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <BooleanFilterInput
                data={characterFlags}
                title={"Others"}
                defaultValue={booleanDefaultValueFromFilter(filter, characterFlagKeys)}
                onChange={v => handleBooleanFilterInput(setFilter, characterFlagKeys, v)}
            />
        </FilterWidgetWrapper>
    )
}
