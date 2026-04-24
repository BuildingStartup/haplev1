import BusinessList from "./BusinessList"

function TopCategories() {
    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Top Category Sellers</h2>
            <BusinessList />
        </div>
    )
}

export default TopCategories
