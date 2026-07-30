import type { Metadata } from "next"
import React from "react"
import "@/globals.css"
import { IBM_Plex_Sans_JP } from 'next/font/google'
import Nav from "@/components/nav/Nav"
import WidgetNav from "@/components/widget/WidgetNav"

const IBMPlexSansJP = IBM_Plex_Sans_JP({
    weight: ["400", "600"],
    subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Hatsuboshi"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`
            bg-background-dark text-primary-dark
            ${IBMPlexSansJP.className} font-semibold
            antialiased flex flex-row md
            max-w-screen w-screen min-h-screen
            overflow-x-hidden -mr-[calc(100vw-100%)]
        `}>
            <nav className={`
                hidden sticky top-0 tablet:flex
                flex-grow h-screen max-h-screen
                tablet:max-w-max-tablet-nav    tablet:min-w-min-tablet-nav
                laptop:max-w-max-laptop-nav    laptop:min-w-min-laptop-nav
                desktop:max-w-max-desktop-nav  desktop:min-w-min-desktop-nav
            `}>
                <Nav/>
            </nav>
            <main className={`
                flex flex-grow h-full w-[calc(100%-var(--spacing-lg-mobile-gap)*2)] mx-lg-mobile-gap
                tablet:mx-lg-tablet-gap   tablet-wide:mx-auto
                laptop:mx-lg-laptop-gap   laptop-wide:mx-auto
                desktop:mx-lg-laptop-gap  desktop-wide:mx-auto
                tablet:max-w-[calc(var(--breakpoint-tablet-wide)-var(--spacing-max-tablet-nav)-(var(--spacing-lg-tablet-gap)*2))]
                tablet:min-w-[calc(var(--breakpoint-tablet)-var(--spacing-min-tablet-nav)-(var(--spacing-lg-tablet-gap)*2))]
                laptop:max-w-[calc(var(--breakpoint-laptop-wide)-var(--spacing-max-laptop-nav)-(var(--spacing-lg-laptop-gap)*2))]
                laptop:min-w-[calc(var(--breakpoint-laptop)-var(--spacing-min-laptop-nav)-(var(--spacing-lg-laptop-gap)*2))]
                desktop:max-w-[calc(var(--breakpoint-desktop-wide)-var(--spacing-max-desktop-nav)-(var(--spacing-lg-laptop-gap)*2))]
                desktop:min-w-[calc(var(--breakpoint-desktop)-var(--spacing-min-desktop-nav)-(var(--spacing-lg-laptop-gap)*2))]                     
            `}>
            <div className={`
                flex w-full
                py-sm-mobile-gap
                tablet:py-sm-tablet-gap
                laptop:py-sm-laptop-gap
                desktop:gap-x-sm-laptop-gap
            `}>
                <div className={`
                    flex flex-grow
                    w-full
                    tablet:max-w-max-tablet-main    tablet:min-w-min-tablet-main
                    laptop:max-w-max-laptop-main    laptop:min-w-min-laptop-main
                    desktop:max-w-max-desktop-main  desktop:min-w-min-desktop-main
                `}>
                    {children}
                </div>
                <div className={`
                    fixed flex flex-col
                    right-lg-mobile-gap bottom-sm-mobile-gap w-[calc(100%-var(--spacing-lg-mobile-gap)*2)]
                    tablet:right-lg-tablet-gap tablet:bottom-sm-tablet-gap tablet:w-[calc(100%-var(--spacing-lg-tablet-gap)*2-var(--spacing-min-tablet-nav))]
                    laptop:right-lg-laptop-gap laptop:bottom-sm-laptop-gap laptop:w-max-sidenav
                    desktop:static desktop:flex-grow desktop:max-w-max-sidenav desktop:min-w-min-sidenav
                `}>
                    <WidgetNav/>
                </div>
            </div>
            </main>
        </body>
        </html>
    )
}
