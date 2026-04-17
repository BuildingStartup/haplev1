function SellersList() {
    const sellers = [
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "seller1",
        },
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "seller2",
        },
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "seller3",
        },
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "seller4",
        },
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "seller4",
        },
        {
            name: "Maya J.",
            category_name: "Hair expert",
            description: "Specializes in protective styles and natural hair care.",
            image: "",
        },
    ]
    return (
        <div className="grid grid-flow-col auto-cols-[170px] lg:auto-cols-[256px] gap-9 overflow-x-hidden">
                {sellers.map((seller, index) => (
                    <div key={index} className="rounded-2xl bg-white flex  flex-col items-center gap-3 p-6 text-center">
                        <picture>
                            <img src={`../${seller.image}.jpg`} alt={seller.name} />
                        </picture>
                        <div>
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-base text-center">{seller.name}</p>
                                <img src="../checkIcon.svg" alt="verified" />
                            </div>
                            <span className="bg-neutral-300/15 font-medium rounded-full py-1 px-6">{seller.category_name}</span>
                        </div>
                        <p className="text-neutral-100">{seller.description}</p>
                    </div>
              ))}
        </div>
    )
}

export default SellersList
