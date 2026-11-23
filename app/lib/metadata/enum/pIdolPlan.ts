import { EnumMetadata } from "@/lib/util/types"
import { PIdolPlan } from "@hatsuboshi/types"

export const pIdolPlanMetadata: EnumMetadata<PIdolPlan>[] = [
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