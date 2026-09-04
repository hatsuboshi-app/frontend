import { EnumData, SortDirection } from "@/lib/util/types"
import { Rarity, Plan, Sortable, Override, IPDrink, SortOption } from "@hatsuboshi/types"
import { DropdownOption } from "@/components/input/DropdownMenu"

export const pDrinkDefaultSortField: Sortable<IPDrink> = "unlockLevel"
export const pDrinkDefaultSortDirection: SortDirection = "asc"
export const pDrinkHiddenSortOptions: SortOption<IPDrink>[] = [
    { attribute: "unlockLevel", ascending: true }
]

export const pDrinkSortFields: Override<DropdownOption, { id: Sortable<IPDrink> }>[] = [
    { id: "name", label: "Name" },
    { id: "plan", label: "Plan" },
    { id: "rarity", label: "Rarity" },
    { id: "unlockLevel", label: "Unlock Level" },
    { id: "createdAt", label: "Date Added" },
    { id: "updatedAt", label: "Last Updated" }
]

export const pDrinkRarities: EnumData<Rarity>[] = [
    {
        value: Rarity.R,
        displayText: "R",
        displayIcon: null
    },
    {
        value: Rarity.SR,
        displayText: "SR",
        displayIcon: null
    },
    {
        value: Rarity.SSR,
        displayText: "SSR",
        displayIcon: null
    }
]

export const pDrinkPlans: EnumData<Plan>[] = [
    {
        value: Plan.Free,
        displayText: "Free",
        displayIcon: null
    },
    {
        value: Plan.Sense,
        displayText: "Sense",
        displayIcon: null
    },
    {
        value: Plan.Logic,
        displayText: "Logic",
        displayIcon: null
    },
    {
        value: Plan.Anomaly,
        displayText: "Anomaly",
        displayIcon: null
    }
]
