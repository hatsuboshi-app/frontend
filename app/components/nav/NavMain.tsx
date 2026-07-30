import React from "react"
import Link from "next/link";

export default function NavMain() {
    return (
        <div className={"text-secondary-dark font-normal flex flex-col"}>
            <p className={"md"}>Under Early Development</p>
            <Link href={'/'}>Home</Link>
            <Link href={'/skill'}>Skill</Link>
        </div>
    )
}