"use client"

import React, { useEffect, useState } from "react"
import WidgetFrame from "@/components/widget/WidgetFrame"
import { usePathname } from "next/navigation"
import { Nullable } from "@hatsuboshi/types"
import SkillSearchWidget from "@/components/widget/SkillSearchWidget"

const searchElements = {
    "/skill": <SkillSearchWidget/>,
    "/pidol": "PIdols"
}

export default function WidgetNav() {
    const pathname = usePathname()
    let searchElement: Nullable<React.ReactNode> = null
    const [clientPathname, setClientPathname] = useState('')

    useEffect(() => {
        setClientPathname(pathname)
    }, [pathname])

    for (const [key, value] of Object.entries(searchElements)) {
        if (clientPathname.startsWith(key)) searchElement = value
    }

    return (
        <div className={`
            w-full flex flex-col
            gap-y-sm-mobile-gap
            tablet:gap-y-sm-tablet-gap
            laptop:gap-y-sm-laptop-gap
        `}>
            {searchElement &&
            <WidgetFrame>
                {searchElement}
            </WidgetFrame>
            }
            <WidgetFrame>
                <p>test</p>
            </WidgetFrame>
        </div>
    )
}