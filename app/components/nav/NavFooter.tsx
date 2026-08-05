import React from "react"

export default function NavFooter() {
    return (
        <div className={`
            sm text-secondary-dark font-normal leading-relaxed select-none
            tablet:px-1.5
            laptop:px-sm-laptop-gap
        `}>
            <p className={"tablet:mb-2 laptop:mb-0"}>Data ©&nbsp;BNEI, QualiArts Inc. & co.</p>
            <p>Hatsuboshi App is not affiliated with BNEI or QualiArts Inc.</p>
        </div>
    )
}