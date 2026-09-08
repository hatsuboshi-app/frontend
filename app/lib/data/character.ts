import { EnumData, SortDirection } from "@/lib/util/types"
import { CharacterFilterOptions, ICharacter, Override, Sortable, SortOption } from "@hatsuboshi/types"
import { DropdownOption } from "@/components/input/DropdownMenu"

export const characterDefaultSortField: Sortable<ICharacter> = "isPlayable"
export const characterDefaultSortDirection: SortDirection = "desc"
export const characterHiddenSortOptions: SortOption<ICharacter>[] = [
    { attribute: "isPlayable", ascending: false },
    { attribute: "createdAt", ascending: true }
]

export const characterSortFields: Override<DropdownOption, { id: Sortable<ICharacter> }>[] = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "isPlayable", label: "Playable" },
    { id: "createdAt", label: "Date Added" },
    { id: "updatedAt", label: "Last Updated" }
]

export const characterFlags: EnumData<keyof CharacterFilterOptions>[] = [
    {
        value: "isPlayable",
        displayText: "Playable",
        displayIcon: null
    }
]

export const characterFlagKeys: (keyof CharacterFilterOptions)[] = ["isPlayable"]
