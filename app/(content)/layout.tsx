import { PropsWithChildren, Suspense } from "react";

export default async function Layout({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={"Loading..."}>
            {children}
        </Suspense>
    )
}