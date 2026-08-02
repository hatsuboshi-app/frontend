import { EnumData, FilterInputProps } from "@/lib/util/types"
import { useEffect, useState } from "react"
import { getCharacters } from "@/lib/api/data/character"
import EnumFilterInput from "@/components/widget/primitives/EnumFilterInput"
import { Character } from "@hatsuboshi/types";

export default function CharacterFilterInput({defaultValue, onChange, title}: FilterInputProps<string[]>) {
    const [characters, setCharacters] = useState<Character[]>([])
    const [characterEnumData, setCharacterEnumData] = useState<EnumData<string>[]>([])

    useEffect(() => {
        getCharacters({ filter: { isPlayable: true } }).then(r => {
            if (r.success) setCharacters(r.data.data.sort((c1, c2) => c1.detail.height - c2.detail.height))
        })
    }, [])

    useEffect(() => {
        setCharacterEnumData(characters.map(c => ({ value: c.id, displayText: `${c.lastName.ja}${c.firstName.ja}`, displayIcon: null })))
    }, [characters, setCharacterEnumData])

    return (
        <>{characterEnumData.length !== 0 &&
            <EnumFilterInput data={characterEnumData} defaultValue={defaultValue} title={title} onChange={onChange}/>
        }</>
    )
}