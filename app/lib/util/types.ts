import React from "react"
import { SortOption } from "@hatsuboshi/types"

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

export type GetOptions<F extends {}, I> = {
    filter?: F,
    sort?: SortOption<I>[],
    p?: number,
    pp?: number
}

export type FilterInputProps<V> = {
    title?: string
    defaultValue?: V
    onChange?: (v: V) => void
}

export type EnumData<V> = {
    value: V,
    displayText: string,
    displayIcon: null
}