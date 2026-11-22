import { ResourceMetadata } from "@/lib/util/types"
import { IPIdol, PIdolFilter } from "@hatsuboshi/types"

export const pIdolMetadata: ResourceMetadata<IPIdol, PIdolFilter> = {
    defaultSortOption:
        { attribute: "createdAt", ascending: false },

    hiddenSortOptions: [
        { attribute: "createdAt", ascending: false },
        { attribute: "rarity", ascending: false },
        { attribute: "subplan", ascending: true }
    ],

    sortFields: [
        { id: "name", label: "Name" },
        { id: "plan", label: "Plan" },
        { id: "subplan", label: "Sub-Plan" },
        { id: "rarity", label: "Rarity" },
        { id: "isWelfare", label: "Is Welfare" },
        { id: "initialStamina", label: "Stamina" },
        { id: "createdAt", label: "Date Added" },
        { id: "updatedAt", label: "Last Updated" }
    ],

    flags: [
        {
            value: "isWelfare",
            displayText: "Event Reward",
            displayIcon: null
        },
        {
            value: "hasPrimaStellaUpgrade",
            displayText: "Prima Stella Upgrade",
            displayIcon: null
        },
        {
            value: "hasTrainingLv7",
            displayText: "Training Lv. 7",
            displayIcon: null
        }
    ]
}