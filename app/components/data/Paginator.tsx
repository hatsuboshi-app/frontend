import { IPaginator } from "@hatsuboshi/types"
import { LuChevronFirst, LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SEARCH_PARAM_PAGE } from "@/lib/util/consts"
import { useEffect } from "react"

export default function Paginator({ meta }: { meta?: IPaginator<any>["meta"] }){
    const r = useRouter()
    const pathname = usePathname()
    const params = new URLSearchParams(useSearchParams().toString())

    const startingIndex = meta
        ? meta.totalPages < meta.currentPage ? null : Math.max(meta.currentPage - 1, 0) * meta.pageSize + 1
        : 0
    const endingIndex = meta
        ? startingIndex === null ? null : Math.min(startingIndex + meta.pageSize, meta.totalItems + 1) - 1
        : 0
    const previousPage = meta
        ? meta.currentPage !== 1 ? Math.min(meta.currentPage - 1, meta.totalPages) : null
        : null
    const nextPage = meta
        ? meta.currentPage < meta.totalPages ? meta.currentPage + 1 : null
        : null

    useEffect(() => {
        if (meta) {
            if (meta.currentPage > meta.totalPages) {
                params.delete(SEARCH_PARAM_PAGE)
                r.replace(`${pathname}?${params.toString()}`, { scroll: false })
            }
        }
    }, [])

    return (
        <div className={"sm inline-flex flex-row gap-xs-mobile-gap tablet:gap-xs-tablet-gap laptop:gap-xs-laptop-gap h-8"}>
            <div className={"flex flex-row flex-nowrap"}>
                <button
                    className={"rounded-hatsuboshi !rounded-tr-none button h-8 w-8 flex items-center justify-center translate-x-[1px]"}
                    disabled={previousPage === null}
                    onClick={() => {
                        params.delete(SEARCH_PARAM_PAGE)
                        r.push(`${pathname}?${params.toString()}`, { scroll: false })
                    }}
                >
                    <LuChevronFirst size={20}/>
                </button>
                <button
                    className={"rounded-hatsuboshi !rounded-bl-none button h-8 w-8 flex items-center justify-center"}
                    disabled={previousPage === null}
                    onClick={() => {
                        if (previousPage) {
                            if (previousPage === 1) params.delete(SEARCH_PARAM_PAGE)
                            else params.set(SEARCH_PARAM_PAGE, previousPage.toString())
                            r.push(`${pathname}?${params.toString()}`, { scroll: false })
                        }
                    }}
                >
                    <LuChevronLeft size={20}/>
                </button>
            </div>
            {meta && <span className={"block flex-grow-1 font-normal whitespace-nowrap my-auto pt-0.5"}>
                <b>{startingIndex} - {endingIndex}</b> of {meta.totalItems} results
            </span>}
            {meta === undefined && <div className={"h-3 w-[118px] my-auto bg-secondary-dark/11 rounded-full"}/>}
            <button
                className={"rounded-hatsuboshi button h-8 w-8 flex items-center justify-center"}
                disabled={nextPage === null}
                onClick={() => {
                    if (nextPage) {
                        params.set(SEARCH_PARAM_PAGE, nextPage.toString())
                        r.push(`${pathname}?${params.toString()}`, { scroll: false })
                    }
                }}
            >
                <LuChevronRight size={20}/>
            </button>
        </div>
    )
}