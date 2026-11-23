"use client"

import React, { PropsWithChildren, useState } from "react"
import { IPaginator } from "@hatsuboshi/types"
import DropdownMenu, { DropdownOption } from "@/components/input/DropdownMenu"
import { TbSortAscendingLetters, TbSortDescendingLetters } from "react-icons/tb"
import { DEFAULT_PER_PAGE, RESOURCE_METADATA } from "@/lib/util/consts"
import { setUserPerPage } from "@/lib/api/cookies/perPage"
import { setUserSortField } from "@/lib/api/cookies/sortField"
import { setUserSortDirection } from "@/lib/api/cookies/sortDirection"
import Paginator from "@/components/data/Paginator"
import { ResourcePath, SortDirection } from "@/lib/util/types"

const perPageOptionList: DropdownOption[] = [
    { id: "10", label: "10" },
    { id: "15", label: "15" },
    { id: "30", label: "30" },
]

const sortDirectionOptionList: DropdownOption[] = [
    { id: "asc", label: "Ascending", icon: TbSortAscendingLetters },
    { id: "desc", label: "Descending", icon: TbSortDescendingLetters }
]

type ResultsWrapperProps = {
    path: ResourcePath
    paginatorMeta?: IPaginator<any>["meta"],
    pageSize?: number
    currentSortField?: string
    currentSortDirection?: string
    className?: string
}

export default function ResultsWrapper({ children, path, paginatorMeta, pageSize, currentSortField, currentSortDirection, className }: PropsWithChildren<ResultsWrapperProps>) {
    const metadata = RESOURCE_METADATA[path]
    const sortFieldOptionList: DropdownOption[] = metadata.sortFields ?? []

    const [sortField, setSortField] = useState<DropdownOption>(
        sortFieldOptionList.find(i => i.id === currentSortField) as DropdownOption ??
        sortFieldOptionList.find(i => i.id === (metadata.defaultSortOption.attribute ?? "")) as DropdownOption
    )

    const [sortDirection, setSortDirection] = useState<DropdownOption>(
        sortDirectionOptionList.find(i => i.id === currentSortDirection) as DropdownOption ??
        sortDirectionOptionList.find(i => i.id === (!metadata.defaultSortOption.ascending ? "desc" : "asc")) as DropdownOption
    )

    const [perPage, setPerPage] = useState<DropdownOption>(
        perPageOptionList.find(i => i.id === (paginatorMeta ? paginatorMeta.pageSize.toString() : pageSize?.toString())) as DropdownOption ??
        perPageOptionList.find(i => i.id === DEFAULT_PER_PAGE.toString())
    )

    return (
        <div className={"flex flex-col w-full"}>
            <div className={`
                flex flex-row flex-wrap
                mb-xs-mobile-gap gap-x-xs-mobile-gap gap-y-2
                tablet:mb-xs-tablet-gap tablet:gap-x-xs-tablet-gap
                laptop:mb-xs-laptop-gap laptop:gap-x-xs-laptop-gap
            `}>
                <div className={"flex flex-row gap-x-xs-mobile-gap tablet:gap-x-xs-tablet-gap laptop:gap-x-xs-laptop-gap"}>
                    <DropdownMenu
                        label={"Sort by"} labelPosition={"left"} items={sortFieldOptionList} selectedId={sortField.id}
                        onSelect={o => {
                            setSortField(o)
                            setUserSortField(path, o.id).then()
                        }}
                    />
                    <DropdownMenu
                        label={""} align={"right"} items={sortDirectionOptionList} selectedId={sortDirection.id}
                        onSelect={o => {
                            setSortDirection(o)
                            setUserSortDirection(path, o.id as SortDirection).then()
                        }}
                    />
                </div>
                <div className={"flex flex-row items-center ml-auto gap-x-xs-mobile-gap tablet:gap-x-xs-tablet-gap laptop:gap-x-xs-laptop-gap"}>
                    <DropdownMenu
                        label={"per page"} labelPosition={"right"} items={perPageOptionList} selectedId={perPage.id}
                        onSelect={o => {
                            setPerPage(o)
                            setUserPerPage(Number(o.id)).then()
                        }}
                    />
                    <Paginator meta={paginatorMeta}/>
                </div>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}