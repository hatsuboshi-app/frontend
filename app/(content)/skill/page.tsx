import SkillResults from "@/components/data/skill/SkillResults"
import { Suspense } from "react";
import { SearchParams } from "next/dist/server/request/search-params";
import { SEARCH_PARAM_FILTER } from "@/lib/data/consts";
import { decompressFromEncodedURIComponent } from "lz-string";
import { skillFilterExpand } from "@/lib/util/functions";
import { SkillFilterOptions } from "@hatsuboshi/types";

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams
    const existingFilter = params[SEARCH_PARAM_FILTER]
    let filter: SkillFilterOptions = {}
    if (typeof existingFilter === "string") filter = skillFilterExpand(decompressFromEncodedURIComponent(existingFilter)) ?? {}

    return <>
        <Suspense fallback={<p>Loading</p>}>
            <SkillResults filter={filter}/>
        </Suspense>
    </>
}
