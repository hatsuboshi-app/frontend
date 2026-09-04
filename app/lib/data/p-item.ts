import { EnumData, SortDirection } from "@/lib/util/types"
import { PItemSource, Rarity, Plan, Sortable, SortOption, Override, IPItem } from "@hatsuboshi/types"
import { DropdownOption } from "@/components/input/DropdownMenu"

export const pItemDefaultSortField: Sortable<IPItem> = "plan"
export const pItemDefaultSortDirection: SortDirection = "asc"
export const pItemHiddenSortOptions: SortOption<IPItem>[] = [
    { attribute: "plan", ascending: true }
]

export const pItemSortFields: Override<DropdownOption, { id: Sortable<IPItem> }>[] = [
    { id: "name", label: "Name" },
    { id: "plan", label: "Plan" },
    { id: "rarity", label: "Rarity" },
    { id: "source", label: "Source" },
    { id: "createdAt", label: "Date Added" },
    { id: "updatedAt", label: "Last Updated" }
]

export const pItemRarities: EnumData<Rarity>[] = [
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

export const pItemPlans: EnumData<Plan>[] = [
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

export const pItemSources: EnumData<PItemSource>[] = [
    {
        value: PItemSource.PIdol,
        displayText: "Produce Idol",
        displayIcon: null
    },
    {
        value: PItemSource.SupportCard,
        displayText: "Support Card",
        displayIcon: null
    },
    {
        value: PItemSource.Other,
        displayText: "Other",
        displayIcon: null
    }
]
