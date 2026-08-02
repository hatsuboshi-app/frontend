"use client"

import PageSizeSetter from "@/components/data/paginator/PageSizeSetter"

type PaginatorBarProps = {
    pageSize: number
    totalPages?: number
    totalItems?: number
}

export default function PaginatorBar({ pageSize, totalPages, totalItems }: PaginatorBarProps) {
    return (
        <div className={"flex flex-row w-full justify-between tablet:justify-start"}>
            <PageSizeSetter currentPerPage={pageSize}/>
            {Array.from(Array(totalPages).keys()).map((_, i) => {
                return <div key={i} className={"w-12 h-12 flex items-center justify-center"}><span>{i+1}</span></div>
            })}
        </div>
    )
}