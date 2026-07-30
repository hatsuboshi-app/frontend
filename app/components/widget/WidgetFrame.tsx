import React, { PropsWithChildren } from "react";

export default function WidgetFrame({ children }: PropsWithChildren) {
    return (
        <div className={`
            w-full border border-border-dark bg-background-dark rounded-lg relative min-h-12
            px-xs-mobile-gap py-xs-mobile-gap
            tablet:px-xs-tablet-gap tablet:py-xs-tablet-gap
            laptop:px-xs-laptop-gap laptop:py-xs-laptop-gap
        `}>
            <div className={`
                flex flex-row-reverse absolute rounded-r-xl
                gap-x-sm-mobile-gap top-0 right-0
                tablet:gap-x-sm-tablet-gap
                laptop:gap-x-sm-laptop-gap
            `}>
                <button className={"h-12 w-12 hover:cursor-pointer text-secondary-dark hover:text-primary-dark transition-colors"} onClick={() => {}}>
                    E
                </button>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}