import type { Metadata } from "next"
import React from "react"
import "@/globals.css"
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
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
                ${notoSansJP.className} font-semibold
                antialiased flex flex-row
                max-w-screen w-screen min-h-screen h-screen
                overflow-x-hidden -mr-[calc(100vw-100%)]
            `}>
                <nav className={`
                    hidden tablet:flex
                    flex-grow h-full max-h-screen
                    tablet:max-w-max-tablet-nav    tablet:min-w-min-tablet-nav
                    laptop:max-w-max-laptop-nav    laptop:min-w-min-laptop-nav
                    desktop:max-w-max-desktop-nav  desktop:min-w-min-desktop-nav
                `}>
                    <div className={`
                        flex flex-col items-center text-center h-full w-full max-w-full min-w-full
                        border-r border-border-dark
                        tablet:py-lg-tablet-gap
                        laptop:py-lg-laptop-gap
                    `}>
                        <div className={`lg select-none`}>
                            <p>初星アプリ</p>
                        </div>

                        {/* Main Nav */}

                        <div className={"flex-grow"}/>

                        <div className={`sm text-secondary-dark font-normal leading-relaxed select-none`}>
                            <p>Data © BNEI, QualiArts Inc. & co.</p>
                            <p>Not affiliated with BNEI or QualiArts Inc.</p>
                        </div>
                    </div>
                </nav>
                <main className={`
                    flex flex-grow h-full w-full mx-lg-mobile-gap
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
                        flex gap-x-lg-laptop-gap w-full
                        tablet:py-lg-tablet-gap
                        laptop:py-lg-laptop-gap
                    `}>
                        <div className={`
                            flex flex-grow
                            mobile:w-full
                            tablet:max-w-max-tablet-main    tablet:min-w-min-tablet-main
                            laptop:max-w-max-laptop-main    laptop:min-w-min-laptop-main
                            desktop:max-w-max-desktop-main  desktop:min-w-min-desktop-main
                        `}>
                            {children}
                        </div>
                        <div className={`
                            hidden desktop:flex
                            flex-grow
                            desktop:max-w-max-sidenav  desktop:min-w-min-sidenav
                        `}>
                            {/* Mini Nav */}
                        </div>
                    </div>
                </main>
            </body>
        </html>
    )
}
