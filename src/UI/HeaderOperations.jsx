import { useState } from "react"
import SortBy from "./SortBy"
import Filter from "./Filter"

function HeaderOperations() {
    return (
        <div className="flex items-center justify-between">            
                <SortBy options={[
                     { id: 'latest', label: 'Latest' },
                     { id: 'popular', label: 'Popular' },
                     { id: 'recommended', label: 'Recommended' },
                ]} />

                <Filter options={[
                     { id: 'all', label: 'All' },
                     { id: 'product', label: 'Product' },
                     { id: 'service', label: 'Service' },
                ]} />
        </div>
    )
}

export default HeaderOperations
