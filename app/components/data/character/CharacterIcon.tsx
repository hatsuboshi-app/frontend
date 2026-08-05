"use client"

import { Character, ICharacter } from "@hatsuboshi/types"

export default function CharacterIcon({ characterJson }: { characterJson?: ICharacter }) {
    const character = characterJson ? new Character(characterJson) : undefined
    const isSuspense = !character

    return (!isSuspense ?
            // hydrated
            <></>
            :
            // suspense
            <></>
    )
}
