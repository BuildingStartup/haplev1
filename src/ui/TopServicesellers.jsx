import BusinessList from "./BusinessList"

function TopServicesellers({sellers, categories}) {
    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Top Service Sellers</h2>
            <BusinessList sellers={sellers} categories={categories} filterValue={"services"} />
        </div>
    )
}

export default TopServicesellers
