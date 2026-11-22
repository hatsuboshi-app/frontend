import React from "react"
import {
    IPersistentObject,
    Override,
    PersistentObjectFilter,
    Sortable,
    SortOption
} from "@hatsuboshi/types"
import { DropdownOption } from "@/components/input/DropdownMenu"

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

export type FilterInputProps<V> = {
    title?: string
    defaultValue?: V
    onChange?: (v: V) => void
}

export type SortDirection =
    | "asc"
    | "desc"

export type EnumMetadata<V> = {
    value:       V,
    displayText: string,
    displayIcon: null
}

export type ResourceMetadata<I extends IPersistentObject, F extends PersistentObjectFilter> = {
    defaultSortOption:  SortOption<I>
    hiddenSortOptions?: SortOption<I>[]
    sortFields?:        Override<DropdownOption, { id: Sortable<I> }>[]
    flags?:             EnumMetadata<keyof F>[]
}
