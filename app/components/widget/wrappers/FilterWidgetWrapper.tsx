import React from "react"

export default function FilterWidgetWrapper({ children }: React.PropsWithChildren) {
    return (
        <div className={`
            flex flex-col
            gap-y-lg-mobile-gap
            tablet:gap-y-sm-tablet-gap
            laptop:gap-y-sm-laptop-gap
            pt-1
        `}>
            {children}
        </div>
    )
}