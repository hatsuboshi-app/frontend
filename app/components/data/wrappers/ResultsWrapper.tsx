import { PropsWithChildren } from "react"
import PaginatorBar from "@/components/data/PaginatorBar"
import { Paginator } from "@hatsuboshi/types"

type ResultsWrapperProps = {
    paginatorMeta: Paginator<any, any>["meta"],
    className?: string
}

export default async function ResultsWrapper({
                                                 children,
                                                 paginatorMeta,
                                                 className
                                             }: PropsWithChildren<ResultsWrapperProps>) {
    return (
        <div className={"flex flex-col w-full"}>
            <PaginatorBar
                pageSize={paginatorMeta.pageSize}
                totalPages={paginatorMeta.totalPages}
                totalItems={paginatorMeta.totalItems}
            />
            <div className={className}>
                {children}
            </div>
        </div>
    )
}