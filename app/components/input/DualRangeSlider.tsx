'use client'

import React, { useCallback, useId, useRef, useState } from 'react'

type Thumb = 'min' | 'max'

type DualRangeSliderProps = Partial<{
    min: number
    max: number
    step: number
    defaultValue: [number, number]
    onChange: (value: [number, number]) => void
    minGap: number
    formatLabel: (value: number) => string
    className: string
    disabled: boolean
}>

export default function DualRangeSlider({min = 0, max = 80, step = 1, defaultValue, onChange, minGap = 0, formatLabel = (v) => `${v}`, className = '', disabled = false }: DualRangeSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const activeThumb = useRef<Thumb | null>(null)
    const baseId = useId()
    const [gte, setGte] = useState(defaultValue?.[0] ?? min)
    const [lte, setLte] = useState(defaultValue?.[1] ?? max)

    const clampStep = useCallback((raw: number) => {
        const stepped = Math.round((raw - min) / step) * step + min
        return Math.min(max, Math.max(min, stepped))
    }, [min, max, step])

    const commit = useCallback((next: [number, number]) => {
        setGte(next[0])
        setLte(next[1])
        onChange?.(next)
    }, [onChange])

    const valueFromClientX = useCallback((clientX: number) => {
        const track = trackRef.current
        if (!track) return min
        const rect = track.getBoundingClientRect()
        const ratio = (clientX - rect.left) / rect.width
        const raw = min + Math.min(1, Math.max(0, ratio)) * (max - min)
        return clampStep(raw)
    }, [min, max, clampStep])

    const updateFromPointer = useCallback((clientX: number) => {
        if (!activeThumb.current) return
        const next = valueFromClientX(clientX)
        if (activeThumb.current === 'min') {
            const capped = Math.min(next, lte - minGap)
            commit([Math.max(min, Math.min(capped, lte)), lte])
        } else {
            const capped = Math.max(next, gte + minGap)
            commit([gte, Math.min(max, Math.max(capped, gte))])
        }
    }, [valueFromClientX, gte, lte, minGap, min, max, commit])

    const handlePointerDown = (thumb: Thumb) => (e: React.PointerEvent) => {
        if (disabled) return
        (e.target as HTMLElement).setPointerCapture(e.pointerId)
        activeThumb.current = thumb
        updateFromPointer(e.clientX)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!activeThumb.current) return
        updateFromPointer(e.clientX)
    }

    const endDrag = () => {
        activeThumb.current = null
    }

    const pctFor = (v: number) => ((v - min) / (max - min)) * 100
    const minPct = pctFor(gte)
    const maxPct = pctFor(lte)

    return (
        <div className={`w-full select-none ${className} px-2 pt-2`}>
            <div
                ref={trackRef}
                className={`relative h-1 w-full touch-none rounded-full bg-background-inset-dark shadow-inner`}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                <div
                    className="absolute h-full rounded-full bg-accent"
                    style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
                />
                <button
                    type="button"
                    role="slider"
                    aria-valuemin={min}
                    aria-valuemax={lte}
                    aria-valuenow={gte}
                    aria-valuetext={formatLabel(gte)}
                    id={`${baseId}-min`}
                    disabled={disabled}
                    className={`
                        absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2
                        touch-none items-center justify-center rounded-full hover:cursor-ew-resize
                        focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50
                        disabled:opacity-50
                    `}
                    style={{ left: `${minPct}%` }}
                    onPointerDown={handlePointerDown('min')}
                >
                    <span className="h-4 w-4 rounded-full border-2 border-accent bg-white"/>
                </button>
                <button
                    type="button"
                    role="slider"
                    aria-valuemin={gte}
                    aria-valuemax={max}
                    aria-valuenow={lte}
                    aria-valuetext={formatLabel(lte)}
                    id={`${baseId}-max`}
                    disabled={disabled}
                    className={`
                        absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2
                        touch-none items-center justify-center rounded-full hover:cursor-ew-resize
                        focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50
                        disabled:opacity-50
                    `}
                    style={{ left: `${maxPct}%` }}
                    onPointerDown={handlePointerDown('max')}
                >
                    <span className="h-4 w-4 rounded-full border-2 border-accent bg-white"/>
                </button>
            </div>
            <div className="mt-2 flex justify-between sm text-secondary-dark -mx-2">
                <span>{formatLabel(gte)}</span>
                <span>{formatLabel(lte)}</span>
            </div>
        </div>
    )
}