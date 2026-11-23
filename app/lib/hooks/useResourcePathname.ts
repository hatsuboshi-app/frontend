import { PATHS } from "@/lib/util/consts"
import { usePathname } from "next/navigation"
import { ResourcePath } from "@/lib/util/types"

export default function useResourcePathname(): ResourcePath | undefined {
    const pathname = usePathname().replace(/^\//, "")
    for (const v of Object.values(PATHS)) {
        if (pathname === v) return pathname
    }
}