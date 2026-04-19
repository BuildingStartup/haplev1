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
        <div className="grid grid-flow-col auto-cols-[180px] lg:auto-cols-[389px] gap-4 no-scrollbar overflow-x-auto">
                {sellers.map((seller, index) => (
                    <div key={index} className="rounded-xl lg:rounded-2xl overflow-hidden bg-white ">
                        <div className="relative h-35 lg:h-[219.98px]">
                            <img src={`../${seller.image_url}.jpg`} alt={seller.business_name} className="w-full h-full" />
                            <span className="absolute top-2 right-2 py-0.5 lg:py-1 px-3 bg-white/90 rounded-full text-primary font-medium lg:text-sm capitalize lg:top-4 lg:right-4">{seller.category_name}</span>
                        </div>
                        <div className="p-2 space-y-1 lg:p-6 lg:space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm lg:text-lg font-medium">{seller.business_name}</h3>
                                <img src="../checkIcon.svg" alt="verified"/>
                            </div>
                            <p className="lg:text-base text-neutral-100">{seller.description}</p>
                            <button className="mt-3 lg:mt-6 bg-primary text-white w-full p-1.5 lg:p-2.5 lg:text-sm rounded">View Profile</button>
                        </div>
                    </div>
              ))}
        </div>
    )
}

export default BusinessList
