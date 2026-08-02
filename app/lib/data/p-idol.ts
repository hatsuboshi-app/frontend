import { EnumData } from "@/lib/util/types"
import { PIdolFilterOptions, PIdolPlan, Rarity } from "@hatsuboshi/types"

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