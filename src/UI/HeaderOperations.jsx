import { useState } from "react"
import SortBy from "./SortBy"

function HeaderOperations() {
    return (
        <div className="flex items-center justify-between">
            {/* <p className="text-neutral-100 text-sm">{NumOfSellers} results</p> */}
            <div className="flex items-center gap-1">
                <SortBy options={[
                     { id: 'latest', label: 'Latest' },
                     { id: 'popular', label: 'Popular' },
                     { id: 'recommended', label: 'Recommended' },
                ]} />
            </div>
        </div>
    )
}

export default HeaderOperations
