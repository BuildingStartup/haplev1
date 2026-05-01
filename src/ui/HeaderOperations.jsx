import SortBy from "./SortBy"
function HeaderOperations({NumOfSellers}) {
    return (
        <div className="flex items-center justify-between">  
            <p className="text-neutral-100 lg:text-sm">{NumOfSellers} results</p> 
            <SortBy options={[
                { id: 'latest', label: 'Latest' },
                { id: 'az', label: 'A-Z' },
            ]} />         
        </div>
    )
}

export default HeaderOperations
