"use client"

import React, { useEffect, useState } from "react"
import WidgetFrame from "@/components/widget/WidgetFrame"
import { usePathname } from "next/navigation"
import SkillFilterWidget from "@/components/widget/SkillFilterWidget"
import { PATHS } from "@/lib/util/consts"
import PIdolFilterWidget from "@/components/widget/PIdolFilterWidget"
import CharacterFilterWidget from "@/components/widget/CharacterFilterWidget";
import PDrinkFilterWidget from "@/components/widget/PDrinkFilterWidget";
import PItemFilterWidget from "@/components/widget/PItemFilterWidget";

const filterWidgets: { [key: string]: React.ReactNode } = {
    [`/${PATHS.character}`]: <CharacterFilterWidget/>,
    [`/${PATHS.pDrink}`]: <PDrinkFilterWidget/>,
    [`/${PATHS.pIdol}`]: <PIdolFilterWidget/>,
    [`/${PATHS.pItem}`]: <PItemFilterWidget/>,
    [`/${PATHS.skill}`]: <SkillFilterWidget/>,
}

export default function WidgetNav() {
    const pathname = usePathname()
    const [clientPathname, setClientPathname] = useState('')

    useEffect(() => {
        setClientPathname(pathname)
    }, [pathname])

    return (
        <div className={`
            w-full flex flex-col
            gap-y-sm-mobile-gap
            tablet:gap-y-sm-tablet-gap
            laptop:gap-y-sm-laptop-gap
        `}>
            {filterWidgets[clientPathname] &&
            <WidgetFrame>
                {filterWidgets[clientPathname]}
            </WidgetFrame>
            }
            <WidgetFrame>
                <p>test</p>
            </WidgetFrame>
        </div>
    )
}