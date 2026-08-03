"use client"

import { Character, ICharacter } from "@hatsuboshi/types"
import { DEFAULT_LOCALE } from "@/lib/util/consts"
import SuspenseCard from "@/components/data/SuspenseCard"

export default function CharacterCard({ characterJson }: { characterJson?: ICharacter }) {
    const character = characterJson ? new Character(characterJson) : undefined
    const isSuspense = !character

    return (!isSuspense ?
            // hydrated
            <div
                className={"card border-none min-h-96"}
                style={{ backgroundImage: `linear-gradient(to bottom right, #${character.color.gradient1}, #${character.color.gradient2})` }}
            >
                <p style={{ color: `#${character.color.label}` }} className={"lg"}>
                    {character.lastName[DEFAULT_LOCALE]}{character.firstName[DEFAULT_LOCALE]}
                </p>
            </div>
            :
            // suspense
            <SuspenseCard/>
    )
}
