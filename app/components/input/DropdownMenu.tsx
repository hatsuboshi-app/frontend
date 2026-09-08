import { IconType } from "react-icons"
import { useCallback, useEffect, useRef, useState } from "react"
import { FiCheck, FiChevronDown } from "react-icons/fi"

const COLORS = {
    "default": { item: "hover:bg-white/4", icon: "" }
}

export type DropdownOption = {
    id: string
    label: string
    icon?: IconType
    shortcut?: string
    color?: keyof typeof COLORS
    disabled?: boolean
    separator?: false
}

export type DropdownSeparator = {
    separator: true
}

export type DropdownItem = DropdownOption | DropdownSeparator

export type DropdownMenuProps = {
    label: string
    items: DropdownItem[]
    align?: "left" | "right"
    labelPosition?: "left" | "right"
    selectedId?: string
    onSelect?: (item: DropdownOption) => void
}

export default function DropdownMenu({ label, items, align = "left", labelPosition = "left", selectedId, onSelect }: DropdownMenuProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [entered, setEntered] = useState<boolean>(false)

    const wrapRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    const options = items.filter(i => !i.separator)
    const isSelect = selectedId !== undefined

    const close = useCallback((refocus: boolean) => {
        setOpen(false)
        setEntered(false)
        if (refocus) triggerRef.current?.focus()
    }, [])

    useEffect(() => {
        if (!open) return
        const raf = requestAnimationFrame(() => setEntered(true))
        return () => cancelAnimationFrame(raf)
    }, [open])

    useEffect(() => {
        if (!open) return
        const onPointerDown = (e: PointerEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) close(false)
        }
        document.addEventListener("pointerdown", onPointerDown)
        return () => document.removeEventListener("pointerdown", onPointerDown)
    }, [open, close])

    return (
        <div className={"relative block grow-0"} ref={wrapRef}>
            <button
                ref={triggerRef}
                type={"button"}
                onClick={() => open ? close(false) : setOpen(true)}
                aria-haspopup={"menu"}
                aria-expanded={open}
                className={`button p-button-wide z-10 h-8`}
            >
                {isSelect ? (
                    <>
                        {labelPosition === "left" && <span>{label}&nbsp;</span>}
                        <span className={"grid text-left"}>
                            {options.map(o => (
                                <span
                                    key={o.id}
                                    aria-hidden={o.id !== selectedId}
                                    className={`
                                        font-semibold col-start-1 row-start-1 whitespace-nowrap
                                        ${o.id === selectedId ? "" : "invisible"}
                                    `}
                                >
                                    {o.label}
                                </span>
                            ))}
                        </span>
                        {labelPosition === "right" && <span>&nbsp;{label}</span>}
                    </>
                ) : label}
                <span className={"ml-3"}>
                    <FiChevronDown
                        size={16}
                        aria-hidden
                        className={`
                            shrink-0 text-secondary-dark
                            transition-transform duration-150
                            motion-reduce:transition-none ${open? "rotate-180" : ""}
                        `}
                    />
                </span>
            </button>

            {open && (
                <ul
                    role={"listbox"}
                    className={`
                        absolute w-48 overflow-hidden focus:outline-none rounded-hatsuboshi mt-1 z-10
                        border-1 border-border-dark bg-background-dark shadow-xl
                        transition duration-150 ease-out motion-reduce:transition-none
                        ${align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left"}
                        ${entered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1"}
                    `}
                >
                    {items.map((item, i) => {
                        if (item.separator) return (
                            <li key={`sep-${i}`} role={"separator"} className={"my-1 h-px bg-secondary-dark"}/>
                        )
                        const color = COLORS[item.color ?? "default"]
                        return (
                            <li key={item.id} role={'none'} className={"font-normal"}>
                                <button
                                    role={"menuitem"}
                                    type={"button"}
                                    disabled={item.disabled}
                                    onClick={() => {
                                        if (item.id !== selectedId) onSelect?.(item)
                                        close(true)
                                    }}
                                    className={`
                                        flex w-full items-center gap-2 rounded-hatsuboshi px-3 py-2 text-left sm
                                        focus:outline-none cursor-pointer
                                        transition-colors ${color.item} ${selectedId === item.id ? "font-semibold" : ""}
                                        disabled:pointer-events-none disabled:text-secondary-dark
                                    `}
                                >
                                    {item.icon && (
                                        <item.icon size={16} aria-hidden className={color.icon}/>
                                    )}
                                    {(
                                        <span className={"flex-1 truncate"}>{item.label}</span>
                                    )}
                                    {item.shortcut && (
                                        <span className={"xs tracking-wide text-secondary-dark"}>{item.shortcut}</span>
                                    )}
                                    {selectedId === item.id && (
                                        <FiCheck size={16} aria-hidden className={"text-accent"}/>
                                    )}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}