import { type Metadata } from "next"
import { getPDrinkById } from "@/lib/api/data/p-drink"
import { notFound } from "next/navigation"
import PDrinkMain from "@/components/data/p-drink/PDrinkMain"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await getPDrinkById((await params).id)
    if (!res.success) return { title: "Not Found" }
    else return { title: res.data.name.en || res.data.name.ja }
}

export default async function Page({ params }: Props) {
    const res = await getPDrinkById((await params).id)
    if (!res.success) notFound()
    return <PDrinkMain pDrinkJson={res.data.toJSON()}/>
}
