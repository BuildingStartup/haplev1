function BusinessList() {
    const sellers = [
        {
            business_name: "Luxe Lashes By Sarah",
            description: "Premium eyelash extensions and eyebrow mapping servies right in the campus village.",
            category_name: "Beauty",
            image_url: "luxelushes",
        },
        {
            business_name: "The Brunch box",
            description: "Gournet student made brunch boxes delivered to your dorm every Saturday morning.",
            category_name: "food",
            image_url: "brunchbox",
        },
        {
            business_name: "The Brunch box",
            description: "Gournet student made brunch boxes delivered to your dorm every Saturday morning.",
            category_name: "food",
            image_url: "brunchbox",
        },
        {
            business_name: "The Brunch box",
            description: "Gournet student made brunch boxes delivered to your dorm every Saturday morning.",
            category_name: "food",
            image_url: "brunchbox",
        },
        {
            business_name: "The Brunch box",
            description: "Gournet student made brunch boxes delivered to your dorm every Saturday morning.",
            category_name: "food",
            image_url: "brunchbox",
        },
    ]

    return (
        <div className="grid grid-flow-col auto-cols-[170px] lg:auto-cols-[389px] gap-4 overflow-x-hidden">
                {sellers.map((seller, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden bg-white ">
                        <div className="relative">
                            <img src={`../${seller.image_url}.jpg`} alt={seller.business_name} className="w-full" />
                            <span className="absolute top-4 right-4 py-1 px-3 bg-white/90 rounded-full text-primary font-medium text-sm capitalize">{seller.category_name}</span>
                        </div>
                        <div className="p-6 space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">{seller.business_name}</h3>
                                <img src="../checkIcon.svg" alt="verified"/>
                            </div>
                            <p className="text-base text-neutral-100">{seller.description}</p>
                            <button className="mt-6 bg-primary text-white w-full p-2.5 text-sm rounded">View Profile</button>
                        </div>
                    </div>
              ))}
        </div>
    )
}

export default BusinessList
