import React, { PropsWithChildren, useState } from "react"
import { LuMinimize2 } from "react-icons/lu"
import { IconType } from "react-icons"

type WidgetFrameProps = {
    icon: IconType
}

export default function WidgetFrame({ icon, children }: PropsWithChildren<WidgetFrameProps>) {
    const [minimized, setMinimized] = useState<boolean>(false)
    const Icon = icon

    return (
        <div className={`
            border border-border-dark bg-background-dark relative shadow-xl desktop:shadow-none pointer-events-auto rounded-hatsuboshi-lg
            ${minimized
              ? "max-desktop:!rounded-full max-desktop:h-18 max-desktop:w-18 max-desktop:ml-auto"
              : "min-h-18 w-full"}
            p-lg-mobile-gap tablet:p-sm-tablet-gap laptop:p-sm-laptop-gap
        `}>
            <div className={`
                flex flex-row-reverse absolute rounded-r-xl
                gap-x-sm-mobile-gap top-0 right-0
                tablet:gap-x-sm-tablet-gap
                laptop:gap-x-sm-laptop-gap
            `}>
                <button
                    className={`
                        hover:cursor-pointer hover:text-primary-dark transition-colors desktop:hidden
                        ${minimized ? "text-accent h-18 w-18" : "text-secondary-dark h-18 w-18"}
                        items-center flex justify-center
                    `}
                    onClick={() => { setMinimized(v => !v) }}
                >
                    {minimized ? <Icon size={26}/> : <LuMinimize2 size={20}/>}
                </button>
            </div>
            <div className={minimized ? "hidden desktop:block" : "block"}>
                {children}
            </div>
        </div>
    )
}