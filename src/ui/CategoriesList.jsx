import { TbPerfume } from "react-icons/tb";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";

function CategoriesList({categories}) {
    const iconMap = {
        MdRestaurant: <MdRestaurant />,
        HiShoppingBag: <HiShoppingBag />,
        GiRunningShoe: <GiRunningShoe />,
        HiSparkles: <HiSparkles />,
        GiYarn: <GiYarn />,
        TbPerfume: <TbPerfume />,
        HiHeart: <HiHeart />,
        HiGift: <HiGift />,
        GiLipstick: <GiLipstick />,
        FaCameraRetro: <FaCameraRetro />,
        FaHandSparkles: <FaHandSparkles />,
        MdDesignServices: <MdDesignServices />,
        MdComputer: <MdComputer />,
        FaEllipsisH: <FaEllipsisH />,
      };

    const categoriesToIcon = () =>
        categories
            .map((category, index) => {
                const key = category.name?.toLowerCase().trim();
                return {
                name: category.name,
                icon: iconMap[category.icon] ?? <FaEllipsisH />,
                slug: category.slug,
            };
    });

    const category = categoriesToIcon();


    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Browse by Categories</h2>
            <div className="overflow-x-auto no-scrollbar group">                
                <div className="grid grid-flow-col auto-cols-[120px] lg:auto-cols-[192px] gap-2 lg:gap-4 no-scrollbar animate-scroll group-hover:[animation-play-state:paused]">
                    {category.map((cat, index) => (
                        <div key={index} className="flex items-center p-4 rounded-xl justify-center bg-accent lg:p-6 flex-1">
                            <div className="flex flex-col items-center gap-2 lg:gap-3">
                                <div className="bg-white w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full">
                                    <span className="text-primary text-base lg:text-lg">
                                        {cat.icon}
                                    </span>
                                </div>
                                <span className="lg:text-base text-stone-700 capitalize">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                    {category.map((cat, index) => (
                        <div key={index + 1} className="flex items-center p-4 rounded-xl justify-center bg-accent lg:p-6 flex-1">
                            <div className="flex flex-col items-center gap-2 lg:gap-3">
                                <div className="bg-white w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full">
                                    <span className="text-primary text-base lg:text-lg">
                                        {cat.icon}
                                    </span>
                                </div>
                                <span className="lg:text-base text-stone-700 capitalize">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesList
