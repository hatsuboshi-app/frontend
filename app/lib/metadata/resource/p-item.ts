import { ResourceMetadata } from "@/lib/util/types"
import { IPItem, PItemFilter } from "@hatsuboshi/types"

export const pItemMetadata: ResourceMetadata<IPItem, PItemFilter> = {
    defaultSortOption:
        { attribute: "plan", ascending: true },

    hiddenSortOptions: [
        { attribute: "plan", ascending: true },
        { attribute: "rarity", ascending: true },
        { attribute: "source", ascending: true },
        { attribute: "name", ascending: true }
    ],

    sortFields: [
        { id: "name", label: "Name" },
        { id: "plan", label: "Plan" },
        { id: "rarity", label: "Rarity" },
        { id: "source", label: "Source" },
        { id: "createdAt", label: "Date Added" },
        { id: "updatedAt", label: "Last Updated" }
    ]
}