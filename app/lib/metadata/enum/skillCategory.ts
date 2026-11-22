import { EnumMetadata } from "@/lib/util/types";
import { SkillCategory } from "@hatsuboshi/types";

export const skillCategoryMetadata: EnumMetadata<SkillCategory>[] = [
    {
        value: SkillCategory.Active,
        displayText: "Active",
        displayIcon: null
    },
    {
        value: SkillCategory.Mental,
        displayText: "Mental",
        displayIcon: null
    },
    {
        value: SkillCategory.Trouble,
        displayText: "Trouble",
        displayIcon: null
    }
]