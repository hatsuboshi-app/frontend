import { Plan, SkillCategory, SkillFilterOptions, SkillSource } from "@hatsuboshi/types"
import { EnumData } from "@/lib/util/types"
import SkillConsolidatedRarity from "@hatsuboshi/types/dist/enum/SkillConsolidatedRarity"

export const skillCategories: EnumData<SkillCategory>[] = [
    {
        value: SkillCategory.Active,
        displayText: "Active",
        displayIcon: null
    },
    {
        value: SkillCategory.Mental,
        displayText: "Mental",
        displayIcon: null
    },
    {
        value: SkillCategory.Trouble,
        displayText: "Trouble",
        displayIcon: null
    }
]

export const skillRarities: EnumData<SkillConsolidatedRarity>[] = [
    {
        value: SkillConsolidatedRarity.N,
        displayText: "N",
        displayIcon: null
    },
    {
        value: SkillConsolidatedRarity.R,
        displayText: "R",
        displayIcon: null
    },
    {
        value: SkillConsolidatedRarity.SR,
        displayText: "SR",
        displayIcon: null
    },
    {
        value: SkillConsolidatedRarity.SSR,
        displayText: "SSR",
        displayIcon: null
    },
    {
        value: SkillConsolidatedRarity.Legend,
        displayText: "Legend",
        displayIcon: null
    }
]

export const skillPlans: EnumData<Plan>[] = [
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

export const skillSources: EnumData<SkillSource>[] = [
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

export const skillFlags: EnumData<keyof SkillFilterOptions>[] = [
    {
        value: "isCustomizable",
        displayText: "Customizable",
        displayIcon: null
    }
]

export const skillFlagKeys: (keyof SkillFilterOptions)[] = ["isCustomizable"]
