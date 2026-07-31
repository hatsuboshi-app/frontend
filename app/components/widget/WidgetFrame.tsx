import React, { PropsWithChildren } from "react"

export default function WidgetFrame({ children }: PropsWithChildren) {
    return (
        <div className={`
            w-full border border-border-dark bg-background-dark rounded-hatsuboshi-lg relative min-h-14
            p-lg-mobile-gap
            tablet:p-sm-tablet-gap
            laptop:p-sm-laptop-gap
        `}>
            <div className={`
                flex flex-row-reverse absolute rounded-r-xl
                gap-x-sm-mobile-gap top-0 right-0
                tablet:gap-x-sm-tablet-gap
                laptop:gap-x-sm-laptop-gap
            `}>
                <button
                    className={"h-14 w-14 hover:cursor-pointer text-secondary-dark hover:text-primary-dark transition-colors"}
                    onClick={() => {}}
                >
                    X
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}