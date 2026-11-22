import { EnumMetadata } from "@/lib/util/types"
import { Rarity } from "@hatsuboshi/types"

export const rarityMetadata: EnumMetadata<Rarity>[] = [
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