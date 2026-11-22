import { ResourceMetadata } from "@/lib/util/types"
import { IPDrink, PDrinkFilter } from "@hatsuboshi/types"

export const pDrinkMetadata: ResourceMetadata<IPDrink, PDrinkFilter> = {
    defaultSortOption:
        { attribute: "unlockLevel", ascending: true },

    hiddenSortOptions: [
        { attribute: "unlockLevel", ascending: true },
        { attribute: "plan", ascending: true },
        { attribute: "rarity", ascending: true },
        { attribute: "name", ascending: true }
    ],

    sortFields: [
        { id: "name", label: "Name" },
        { id: "plan", label: "Plan" },
        { id: "rarity", label: "Rarity" },
        { id: "unlockLevel", label: "Unlock Level" },
        { id: "createdAt", label: "Date Added" },
        { id: "updatedAt", label: "Last Updated" }
    ]
}