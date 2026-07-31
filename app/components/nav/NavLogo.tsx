import React from "react"

export default function NavLogo() {
    return (
        <div className={`xl select-none`}>
            <p className={"block tablet:hidden laptop:block"}>Hatsuboshi App</p>
            <p className={"hidden tablet:block laptop:hidden"}>H</p>
        </div>
    )
}