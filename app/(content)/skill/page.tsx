import SkillResults from "@/(content)/skill/components/SkillResults"
import { Suspense } from "react";

export default async function Page() {
    return <>
        <Suspense fallback={<p>Loading</p>}>
            <SkillResults/>
        </Suspense>
    </>
}