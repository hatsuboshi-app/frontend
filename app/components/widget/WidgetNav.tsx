"use client"

import React from "react"
import WidgetFrame from "@/components/widget/WidgetFrame"
import SkillFilterWidget from "@/components/widget/SkillFilterWidget"
import { PATHS } from "@/lib/util/consts"
import PIdolFilterWidget from "@/components/widget/PIdolFilterWidget"
import CharacterFilterWidget from "@/components/widget/CharacterFilterWidget"
import PDrinkFilterWidget from "@/components/widget/PDrinkFilterWidget"
import PItemFilterWidget from "@/components/widget/PItemFilterWidget"
import { LuNotebook, LuSearch } from "react-icons/lu"
import useResourcePathname from "@/lib/hooks/useResourcePathname"
import { ResourcePath } from "@/lib/util/types"

const filterWidgets: Record<ResourcePath, React.ReactNode> = {
    [PATHS.character]:   <CharacterFilterWidget/>,
    [PATHS.pDrink]:      <PDrinkFilterWidget/>,
    [PATHS.pIdol]:       <PIdolFilterWidget/>,
    [PATHS.pItem]:       <PItemFilterWidget/>,
    [PATHS.skill]:       <SkillFilterWidget/>,
    [PATHS.supportCard]: null  // TODO
}

export default function WidgetNav() {
    const pathname = useResourcePathname()

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
            {pathname && filterWidgets[pathname] &&
                <WidgetFrame icon={LuSearch}>
                    {filterWidgets[pathname]}
                </WidgetFrame>
            }
        </div>
    )
}