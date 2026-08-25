import { EnumData } from "@/lib/util/types"
import { Rarity, Plan } from "@hatsuboshi/types"

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
