import { EnumMetadata } from "@/lib/util/types"
import { Plan } from "@hatsuboshi/types"

export const planMetadata: EnumMetadata<Plan>[] = [
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