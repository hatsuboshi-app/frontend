import { ISkill, SkillFilter } from "@hatsuboshi/types"
import { ResourceMetadata } from "@/lib/util/types"

export const skillMetadata: ResourceMetadata<ISkill, SkillFilter> = {
    defaultSortOption:
        { attribute: "source", ascending: true },

    hiddenSortOptions: [
        { attribute: "source", ascending: true },
        { attribute: "plan", ascending: true },
        { attribute: "category", ascending: true },
        { attribute: "rarity", ascending: true },
        { attribute: "unlockLevel", ascending: true }
    ],

    sortFields: [
        { id: "name", label: "Name" },
        { id: "plan", label: "Plan" },
        { id: "rarity", label: "Rarity" },
        { id: "category", label: "Category" },
        { id: "source", label: "Source" },
        { id: "unlockLevel", label: "Unlock Level" },
        { id: "createdAt", label: "Date Added" },
        { id: "updatedAt", label: "Last Updated" }
    ],

    flags: [
        {
            value: "isCustomizable",
            displayText: "Customizable",
            displayIcon: null
        }
    ]
}