import { type Metadata } from "next"
import { getCharacterById } from "@/lib/api/data/character"
import { notFound } from "next/navigation"
import CharacterMain from "@/components/data/character/CharacterMain"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await getCharacterById((await params).id)
    if (!res.success) {
        return { title: "Not Found" }
    }
    const char = res.data
    if (char.firstName.en && char.lastName.en) {
        return { title: `${char.lastName.en} ${char.firstName.en}` }
    }
    return { title: `${char.lastName.ja} ${char.firstName.ja}` }
}

export default async function Page({ params }: Props) {
    const res = await getCharacterById((await params).id)
    if (!res.success) notFound()
    return <CharacterMain characterJson={res.data.toJSON()}/>
}
