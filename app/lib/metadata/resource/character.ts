import { ResourceMetadata } from "@/lib/util/types"
import { CharacterFilter, ICharacter } from "@hatsuboshi/types"

export const characterMetadata: ResourceMetadata<ICharacter, CharacterFilter> = {
    defaultSortOption:
        { attribute: "isPlayable", ascending: false },

    hiddenSortOptions: [
        { attribute: "isPlayable", ascending: false },
        { attribute: "createdAt", ascending: true }
    ],

    sortFields: [
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
        { id: "isPlayable", label: "Playable" },
        { id: "createdAt", label: "Date Added" },
        { id: "updatedAt", label: "Last Updated" }
    ],

    flags: [
        {
            value: "isPlayable",
            displayText: "Playable",
            displayIcon: null
        }
    ]
}
