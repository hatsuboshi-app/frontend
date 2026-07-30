"use client"

import PageSizeSetter from "@/components/data/Paginator/PageSizeSetter"

export default function Paginator({ tp, pp }: any) {
    return (
        <div className={"flex flex-row w-full justify-between tablet:justify-start"}>
            <PageSizeSetter currentPerPage={pp}/>
            {Array.from(Array(tp).keys()).map((_, i) => {
                return <div key={i} className={"w-12 h-12 flex items-center justify-center"}><span>{i+1}</span></div>
            })}
        </div>
    )
}