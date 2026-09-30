"use client"

import React from "react"
import WidgetFrame from "@/components/widget/WidgetFrame"
import { usePathname } from "next/navigation"
import SkillFilterWidget from "@/components/widget/SkillFilterWidget"
import { PATHS } from "@/lib/util/consts"
import PIdolFilterWidget from "@/components/widget/PIdolFilterWidget"
import CharacterFilterWidget from "@/components/widget/CharacterFilterWidget";
import PDrinkFilterWidget from "@/components/widget/PDrinkFilterWidget";
import PItemFilterWidget from "@/components/widget/PItemFilterWidget";
import { LuNotebook, LuSearch } from "react-icons/lu";

const filterWidgets: { [key: string]: React.ReactNode } = {
    [`/${PATHS.character}`]: <CharacterFilterWidget/>,
    [`/${PATHS.pDrink}`]: <PDrinkFilterWidget/>,
    [`/${PATHS.pIdol}`]: <PIdolFilterWidget/>,
    [`/${PATHS.pItem}`]: <PItemFilterWidget/>,
    [`/${PATHS.skill}`]: <SkillFilterWidget/>,
}

export default function WidgetNav() {
    const pathname = usePathname()

    return (
        <div className={`
            w-full flex flex-col desktop:flex-col-reverse
            gap-y-sm-mobile-gap
            tablet:gap-y-sm-tablet-gap
            laptop:gap-y-sm-laptop-gap
        `}>
            <WidgetFrame icon={LuNotebook}>
                <h2 className={"lg"}>Notebook</h2>
            </WidgetFrame>
            {filterWidgets[pathname] &&
            <WidgetFrame icon={LuSearch}>
                {filterWidgets[pathname]}
            </WidgetFrame>
            }
        </div>
    )
}