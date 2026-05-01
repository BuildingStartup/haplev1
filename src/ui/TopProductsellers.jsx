import BusinessList from "./BusinessList"

function TopProductsellers({categories}) {
    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Top Product Sellers</h2>
            <BusinessList categories={categories} filterValue={"products"} />
        </div>
    )
}

export default TopProductsellers
