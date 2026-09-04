import { EnumData, SortDirection } from "@/lib/util/types"
import { IPIdol, Override, PIdolFilterOptions, PIdolPlan, Rarity, Sortable, SortOption } from "@hatsuboshi/types"
import { DropdownOption } from "@/components/input/DropdownMenu"

export const pIdolDefaultSortField: Sortable<IPIdol> = "createdAt"
export const pIdolDefaultSortDirection: SortDirection = "desc"
export const pIdolHiddenSortOptions: SortOption<IPIdol>[] = [
    { attribute: "createdAt", ascending: false },
    { attribute: "rarity", ascending: false },
    { attribute: "subplan", ascending: true },
]

export const pIdolSortFields: Override<DropdownOption, { id: Sortable<IPIdol> }>[] = [
    { id: "name", label: "Name" },
    { id: "plan", label: "Plan" },
    { id: "subplan", label: "Sub-Plan" },
    { id: "rarity", label: "Rarity" },
    { id: "isWelfare", label: "Is Welfare" },
    { id: "initialStamina", label: "Stamina" },
    { id: "createdAt", label: "Date Added" },
    { id: "updatedAt", label: "Last Updated" }
]

export const pIdolRarities: EnumData<Rarity>[] = [
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

export const pIdolPlans: EnumData<PIdolPlan>[] = [
    {
        value: PIdolPlan.Sense,
        displayText: "Sense",
        displayIcon: null
    },
    {
        value: PIdolPlan.Logic,
        displayText: "Logic",
        displayIcon: null
    },
    {
        value: PIdolPlan.Anomaly,
        displayText: "Anomaly",
        displayIcon: null
    }
]

export const pIdolFlags: EnumData<keyof PIdolFilterOptions>[] = [
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
    },
]

export const pIdolFlagKeys: (keyof PIdolFilterOptions)[] = [
    "isWelfare", "hasPrimaStellaUpgrade", "hasTrainingLv7"
]
