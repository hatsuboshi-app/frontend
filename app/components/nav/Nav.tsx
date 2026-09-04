import React from "react"
import NavLogo from "@/components/nav/NavLogo"
import NavFooter from "@/components/nav/NavFooter"
import NavMain from "@/components/nav/NavMain"

export default function Nav() {
    return (
        <div className={`
            flex flex-row justify-center items-center text-center w-full relative h-14 z-50
            tablet:justify-start tablet:flex-col tablet:h-full tablet:border-r tablet:border-border-dark
            tablet:py-sm-tablet-gap tablet:gap-y-sm-tablet-gap
            laptop:py-sm-laptop-gap laptop:gap-y-sm-laptop-gap
        `}>
            <div className={`flex items-center`}>
                <NavLogo/>
            </div>
            <div className={"hidden tablet:block"}>
                <NavMain/>
            </div>
            <div className={"hidden tablet:block flex-grow"}/>
            <div className={"hidden tablet:block"}>
                <NavFooter/>
            </div>
            <button className={"absolute tablet:hidden top-0 left-0 h-14 w-14 hover:cursor-pointer text-secondary-dark hover:text-primary-dark transition-colors select none"}>
                =
            </button>
        </div>
    )
}