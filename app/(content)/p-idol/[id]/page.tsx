import { type Metadata } from "next"
import { getPIdolById } from "@/lib/api/data/p-idol"
import { notFound } from "next/navigation"
import PIdolMain from "@/components/data/p-idol/PIdolMain"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await getPIdolById((await params).id)
    if (!res.success) return { title: "Not Found" }
    else return { title: res.data.name.en || res.data.name.ja }
}

export default async function Page({ params }: Props) {
    const res = await getPIdolById((await params).id)
    if (!res.success) notFound()
    return <PIdolMain pIdolJson={res.data.toJSON()}/>
}
