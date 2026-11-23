import StringFilterInput from "@/components/widget/primitives/StringFilterInput"
import NumberFilterInput from "@/components/widget/primitives/NumberFilterInput"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { skillMetadata } from "@/lib/metadata/resource/skill"
import FilterWidgetWrapper from "@/components/widget/wrappers/FilterWidgetWrapper"
import {
    decodeSkillFilter,
    encodeSkillFilter,
    getBooleanFilterDefaultValue,
    getEnumFilterDefaultValue,
    getNumberFilterDefaultValue,
    getStringFilterDefaultValue,
    handleBooleanFilterInput,
    handleEnumFilterInput,
    handleNumberFilterInput,
    handleStringFilterInput
} from "@/lib/util/functions"
import BooleanFilterInput from "@/components/widget/primitives/BooleanFilterInput"
import useFilter from "@/lib/hooks/useFilter"
import { skillRarityMetadata } from "@/lib/metadata/enum/skillRarity"
import { planMetadata } from "@/lib/metadata/enum/plan"
import { skillCategoryMetadata } from "@/lib/metadata/enum/skillCategory"
import { skillSourceMetadata } from "@/lib/metadata/enum/skillSource"

export default function SkillFilterWidget() {
    const [filter, setFilter] = useFilter({ expand: decodeSkillFilter, minimize: encodeSkillFilter })

    return (
        <FilterWidgetWrapper>
            <p className={"lg"}>Search Skills</p>
            <StringFilterInput
                title={"Name"}
                defaultValue={getStringFilterDefaultValue(filter.name)}
                onChange={v => handleStringFilterInput(setFilter, "name", v)}
            />
            <EnumFilterInput
                title={"Rarity"}
                data={skillRarityMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.rarity) ?? []}
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
            <EnumFilterInput
                title={"Category"}
                data={skillCategoryMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.category)}
                onChange={v => handleEnumFilterInput(setFilter, "category", v)}
            />
            <EnumFilterInput
                title={"Skill Source"}
                data={skillSourceMetadata}
                defaultValue={getEnumFilterDefaultValue(filter.source)}
                onChange={v => handleEnumFilterInput(setFilter, "source", v)}
            />
            <BooleanFilterInput
                title={"Others"}
                data={skillMetadata.flags!}
                defaultValue={getBooleanFilterDefaultValue(filter, skillMetadata.flags!.map(v => v.value))}
                onChange={v => handleBooleanFilterInput(setFilter, skillMetadata.flags!.map(v => v.value), v)}
            />
        </FilterWidgetWrapper>
    )
}
