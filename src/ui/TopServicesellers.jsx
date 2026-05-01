import BusinessList from "./BusinessList"

function TopServicesellers({categories}) {
    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Top Service Sellers</h2>
            <BusinessList categories={categories} filterValue={"services"} />
        </div>
    )
}

export default TopServicesellers
