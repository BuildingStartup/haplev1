import { useState } from "react";

function PortfolioCard({item, sellerInfo}) {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="bg-accent-light rounded-xl  p-2 lg:p-3 flex flex-col gap-2 lg:gap-3.5">
            <picture>
                <img src={item?.image_url} alt={item.name} className={`w-full rounded-xl h-40 object-cover transition-all duration-500 ${
                loadedImages[sellerInfo.id] ? 'blur-0' : 'blur-md'
                }`} 
                loading="lazy"
                onLoad={() => handleImageLoad(sellerInfo.id)} />
            </picture>
            <div className="space-y-4 lg:space-y-7.5 mb-3">
                <p className="lg:text-sm font-medium">{item?.name}</p>
                <p className="text-neutral-500">{item?.caption}</p>
            </div>
        </div>
    )
}

export default PortfolioCard
