import SellersList from "./SellersList"

function VerifiedSellers() {
    return (
        <div className="space-y-3 lg:space-y-9">
            <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
                <div className="space-y-2">
                    <h2 className="text-xl font-medium lg:text-2xl">Verified Campus Sellers</h2>
                    <p className="text-sm lg:text-base text-neutral-100">Every verified seller has been vetted by the Haple community for quality<br/> safety, and reliability</p>
                </div>
                <div className="flex gap-4 items-center p-2 w-fit lg:p-3 lg:w-ful rounded-full bg-white">
                    <div className="flex items-center gap-4">
                        <img src="../checkIcon.svg" alt="check" />
                        <span>Join the curated circle</span>
                    </div>
                    <button className="bg-primary text-white px-6 py-1.5 lg:py-2 rounded-full">Apply Now</button>
                </div>
            </div>
            <SellersList />
            
        </div>
    )
}

export default VerifiedSellers
