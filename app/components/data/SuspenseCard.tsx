export default function SuspenseCard({ className }: { className?: string }) {
    const colorPrimary = "bg-secondary-dark/11"
    const colorSecondary = "bg-secondary-dark/7"

    return (
        <div className={`card gap-y-xs-mobile-gap tablet:gap-y-xs-tablet-gap laptop:gap-y-xs-laptop-gap border-none ${className}`}>
            <div className={"flex flex-row gap-x-xs-mobile-gap tablet:gap-x-xs-tablet-gap laptop:gap-x-xs-laptop-gap"}>
                <div className={`aspect-square w-1/4 rounded-xl ${colorPrimary}`}/>
                <div className={`h-5 w-2/4 rounded-full ${colorPrimary}`}/>
            </div>
            <div className={"flex flex-col gap-y-1.5"}>
                <div className={`h-3 w-2/5 rounded-full ${colorSecondary}`}/>
                <div className={`h-3 w-3/5 rounded-full ${colorSecondary}`}/>
                <div className={`h-3 w-1/5 rounded-full ${colorSecondary}`}/>
            </div>
        </div>
    )
}