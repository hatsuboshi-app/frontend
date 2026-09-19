import { type Metadata } from "next"
import { getPItemById } from "@/lib/api/data/p-item"
import { notFound } from "next/navigation"
import PItemMain from "@/components/data/p-item/PItemMain"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await getPItemById((await params).id)
    if (!res.success) return { title: "Not Found" }
    else return { title: res.data.name.en || res.data.name.ja }
}

export default async function Page({ params }: Props) {
    const res = await getPItemById((await params).id)
    if (!res.success) notFound()
    return <PItemMain pItemJson={res.data.toJSON()}/>
}
