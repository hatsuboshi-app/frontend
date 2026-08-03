import { EnumData } from "@/lib/util/types"
import { CharacterFilterOptions } from "@hatsuboshi/types"

export const characterFlags: EnumData<keyof CharacterFilterOptions>[] = [
    {
        value: "isPlayable",
        displayText: "Playable",
        displayIcon: null
    }
]

export const characterFlagKeys: (keyof CharacterFilterOptions)[] = ["isPlayable"]
