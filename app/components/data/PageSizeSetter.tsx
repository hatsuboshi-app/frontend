import { setUserPerPage } from "@/lib/api/cookies/perPage"

export default function PageSizeSetter({ currentPerPage }: { currentPerPage: number }) {
    const perPageValues = [10, 15, 30]
    return <>
        <label htmlFor={"pp"}>pp</label>
        <select name={"perPage"} id={"pp"} defaultValue={currentPerPage} className={"bg-background-dark focus:outline-none"}
                onChange={e => {
                    setUserPerPage(Number(e.target.value)).then()
                }}>
            {perPageValues.map(ppv => <option value={String(ppv)} key={ppv}>{ppv}</option>)}
            {!perPageValues.includes(currentPerPage) &&
                <option value={String(currentPerPage)} disabled={true}>{currentPerPage}</option>}
        </select>
    </>
}