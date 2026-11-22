import { EnumMetadata } from "@/lib/util/types";
import { PItemSource } from "@hatsuboshi/types";

export const pItemSourceMetadata: EnumMetadata<PItemSource>[] = [
    {
        value: PItemSource.PIdol,
        displayText: "Produce Idol",
        displayIcon: null
    },
    {
        value: PItemSource.SupportCard,
        displayText: "Support Card",
        displayIcon: null
    },
    {
        value: PItemSource.Other,
        displayText: "Other",
        displayIcon: null
    }
]