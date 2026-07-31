import React from "react"

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>

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