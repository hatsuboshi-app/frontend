import React from "react"
import Link from "next/link";

export default function NavMain() {
    return (
        <div className={"text-secondary-dark font-normal flex flex-col"}>
            <p className={"md mb-4"}>Under Early Development</p>
            <Link href={'/'}>Home</Link>
            <Link href={'/skill'}>Skill</Link>
            <Link href={'/p-idol'}>PIdol</Link>
            <Link href={'/p-item'}>PItem</Link>
            <Link href={'/p-drink'}>PDrink</Link>
            <Link href={'/character'}>Character</Link>
        </div>
    )
}