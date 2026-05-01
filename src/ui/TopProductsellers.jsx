import BusinessList from "./BusinessList"

function TopProductsellers({sellers, categories}) {
    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Top Product Sellers</h2>
            <BusinessList sellers={sellers} categories={categories} filterValue={"products"} />
        </div>
    )
}

export default TopProductsellers
