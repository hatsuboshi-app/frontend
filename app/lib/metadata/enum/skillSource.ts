import { EnumMetadata } from "@/lib/util/types"
import { SkillSource } from "@hatsuboshi/types"

export const skillSourceMetadata: EnumMetadata<SkillSource>[] = [
    {
        value: SkillSource.PIdol,
        displayText: "PIdol",
        displayIcon: null
    },
    {
        value: SkillSource.SupportCard,
        displayText: "Support Card",
        displayIcon: null
    },
    {
        value: SkillSource.Basic,
        displayText: "Basics",
        displayIcon: null
    },
    {
        value: SkillSource.Other,
        displayText: "Other",
        displayIcon: null
    }
]