import { useState } from "react";
import { Link } from "react-router-dom";

function BusinessList({sellers, categories, filterValue}) {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const filteredSellers = sellers
    .filter((seller) => {
        // 1. Find the specific category that links to this seller
        const matchedCategory = categories.find((cat) => cat.id === seller.category_id);

        // 2. Check if the found category matches the required 'catalog' value
        return matchedCategory?.catalog === filterValue;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 7)
    .map((seller) => {
        // 4. Attach the category name directly to the seller object for easy display
        const matchedCategory = categories.find((cat) => cat.id === seller.category_id);
        return {
          ...seller,
          categoryName: matchedCategory?.name || "Uncategorized"
        };
      });


    return (
        <div className="grid grid-flow-col auto-cols-[240px] lg:auto-cols-[389px] gap-4 no-scrollbar overflow-x-auto">
                {filteredSellers.map((seller, index) => (
                <div key={seller.id} className="rounded-xl lg:rounded-2xl overflow-hidden bg-white ">
                <div className="relative h-40 lg:h-[219.98px]">
                    {seller.coverImage_url || seller.avatar_url ? (
                    <>
                    <img src={seller.coverImage_url || seller.avatar_url} alt={seller.business_name} className={`w-full h-full object-cover transition-all duration-500 ${
                    loadedImages[seller.id] ? 'blur-0' : 'blur-md'
                    }`} 
                    loading="lazy"
                    onLoad={() => handleImageLoad(seller.id)} />
                    <span className="absolute top-2 right-2 py-0 lg:py-1 px-3 bg-white/90 rounded-full text-primary font-medium text-xs lg:text-sm capitalize lg:top-4 lg:right-4">{seller.categoryName}</span>
                        </>
                    ) : <div className=" absolute w-full h-full flex items-center justify-center bg-primary-lighter">
                            <div className="text-xl text-center lg:text-2xl font-bold tracking-widest text-primary">{seller.business_name}</div>
                            <span className="absolute top-2 right-2 py-0 lg:py-1 px-3 bg-white/90 rounded-full text-primary font-medium text-xs lg:text-sm capitalize lg:top-4 lg:right-4">{seller.categoryName}</span>
                        </div>}
                </div>
                <div className="p-2 space-y-1 lg:p-6 lg:space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm lg:text-lg font-medium line-clamp-1">{seller.business_name}</h3>
                        {/* <img src="../checkIcon.svg" alt="verified" /> */}
                    </div>
                    <p className="lg:text-base text-neutral-100 line-clamp-1 ">{seller.description}</p>
                    <Link to={`/${seller.username}`}>
                        <button className="mt-3 lg:mt-6 bg-primary text-white w-full p-1.5 lg:p-2.5 lg:text-sm rounded cursor-pointer hover:bg-primary-light transition duration-200">View Profile</button>
                    </Link>
                </div>
            </div>
         ))}
        </div>
    )
}

export default BusinessList
