function ProcessGuide({target}) {

    const buyer = [
        {
            imgSrc: "../brunchbox.jpg",
            title: "Discover trusted sellers",
            description: "Browse trusted campus stores and products on Haple. Search by category, brand, or what's trending around you.",
            cta: "Explore experts",
        },
        {
            imgSrc: "../brunchbox.jpg",
            title: "Connect with sellers",
            description: "Tap a profile to see seller info. Message the seller directly on Whatsapp to ask questions or place your order.",
            cta: "Explore experts",
        },
        {
            imgSrc: "../brunchbox.jpg",
            title: "Buy with confidence",
            description: "Pay the seller how you both agree and pick up on campus or arrange delivery. All sellers are verified campus stores.",
            cta: "Explore experts",
        },
    ]
    const seller = [
        {
            imgSrc: "../brunchbox.jpg",
            title: "Create your store",
            description: "Sign up and set up your Haple profile in minutes. Add your products, prices and contact details.",
            cta: "Find experts",
        },
        {
            imgSrc: "../brunchbox.jpg",
            title: "Get discovered",
            description: "Show up where students are already looking. Your store stays live 24/7 so buyers can find you beyond the Trade Fair.",
            cta: "Find experts",
        },
        {
            imgSrc: "../brunchbox.jpg",
            title: "Sell & Track Growth",
            description: "Connect with eager buyers, close sales on Whatsapp, and use your Haple insights to see what's working.",
            cta: "Find experts",
        },
    ]



    return (
        <div className="grid grid-flow-col auto-cols-[240px] lg:grid-cols-3 gap-4 no-scrollbar overflow-x-auto">
            {target === "buyer" && buyer.map((item, index)=> (
                <div key={index} className="space-y-2 lg:space-y-3 p-2 lg:p-3 bg-white rounded-lg">
                    <img src={item.imgSrc} alt="how it works" className="w-full rounded-lg"/>
                    <div className="space-y-1 lg:space-y-1.5">
                        <h3 className="text-base font-medium lg:text-lg">{item.title}</h3>
                        <p className="text-sm text-neutral-100">{item.description}</p>
                        <button className="w-full bg-primary p-2 lg:p-3 lg:text-sm text-white rounded my-2 cursor-pointer">{item.cta}</button>
                    </div>
                </div>
            ))}            
            {target === "seller" && seller.map((item, index)=> (
                <div key={index} className="space-y-2 lg:space-y-3 p-2 lg:p-3 bg-white rounded-lg">
                    <img src={item.imgSrc} alt="how it works" className="w-full rounded-lg"/>
                    <div className="space-y-1 lg:space-y-1.5">
                        <h3 className="text-base font-medium lg:text-lg">{item.title}</h3>
                        <p className="text-sm text-neutral-100">{item.description}</p>
                        <button className="w-full bg-primary p-2 lg:p-3 lg:text-sm text-white rounded my-2 cursor-pointer">{item.cta}</button>
                    </div>
                </div>
            ))}            
                        
            
        </div>
    )
}

export default ProcessGuide
