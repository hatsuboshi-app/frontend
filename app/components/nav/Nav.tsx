import React from "react"
import NavLogo from "@/components/nav/NavLogo"
import NavFooter from "@/components/nav/NavFooter"
import NavMain from "@/components/nav/NavMain"

export default function Nav() {
    return (
        <div className={`
            flex flex-col items-center text-center h-full w-full
            border-r border-border-dark
            tablet:py-sm-tablet-gap
            laptop:py-sm-laptop-gap
        `}>
            <div className={"flex items-center tablet:my-sm-tablet-gap laptop:my-sm-laptop-gap"}>
                <NavLogo/>
            </div>
            <NavMain/>
            <div className={"flex-grow"}/>
            <NavFooter/>
        </div>
    )
}