import SkillResults from "@/components/data/skill/SkillResults"
import { Suspense } from "react";

export default async function Page() {
    return <>
        <Suspense fallback={<p>Loading</p>}>
            <SkillResults/>
        </Suspense>
    </>
}
