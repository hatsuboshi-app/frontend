"use client"

import { Character, ICharacter } from "@hatsuboshi/types"
import { DEFAULT_LOCALE, PATHS } from "@/lib/util/consts"
import SuspenseCard from "@/components/data/SuspenseCard"
import Link from "next/link";

export default function CharacterCard({ characterJson }: { characterJson?: ICharacter }) {
    const character = characterJson ? new Character(characterJson) : undefined

    return (character ?
        // hydrated
        <Link href={`/${PATHS.character}/${character.id}`}
            className={"card border-none min-h-96"}
            style={{ backgroundImage: `linear-gradient(to bottom right, #${character.color.gradient1}, #${character.color.gradient2})` }}
        >
            <p style={{ color: `#${character.color.label}` }} className={"lg"}>
                {character.lastName[DEFAULT_LOCALE]}{character.firstName[DEFAULT_LOCALE]}
            </p>
        </Link>
        :
        // suspense
        <SuspenseCard/>
    )
}
