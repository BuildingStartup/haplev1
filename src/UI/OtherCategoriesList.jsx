import { TbPerfume } from "react-icons/tb";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

function OtherCategoriesList({categories}) {
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
                catalog: category.catalog,
            };
    });

    const category = categoriesToIcon();


    return (
        <div className="space-y-3 lg:space-y-9">
            <div className="overflow-x-auto no-scrollbar group">                
                <div className="grid grid-flow-col auto-cols-[120px] lg:auto-cols-[192px] gap-2 lg:gap-4 no-scrollbar animate-scroll group-hover:[animation-play-state:paused]">
                    {category.map((cat, index) => (
                        <Link to={`/${cat.catalog}/${cat.slug}`}>
                        <div key={index} className="flex items-center p-4 rounded-xl justify-center bg-accent lg:p-3 flex-1">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="bg-white w-4 h-4 lg:w-8 lg:h-8 flex items-center justify-center rounded-full">
                                    <span className="text-primary text-base lg:text-lg">
                                        {cat.icon}
                                    </span>
                                </div>
                                <span className="lg:text-base text-stone-700 capitalize line-clamp-1">{cat.name}</span>
                            </div>
                        </div>
                        </Link>
                    ))}
                    {category.map((cat, index) => (
                        <Link to={`/${cat.catalog}/${cat.slug}`}>
                        <div key={index} className="flex items-center p-4 rounded-xl justify-center bg-accent lg:p-3 flex-1">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="bg-white w-4 h-4 lg:w-8 lg:h-8 flex items-center justify-center rounded-full">
                                    <span className="text-primary text-base lg:text-lg">
                                        {cat.icon}
                                    </span>
                                </div>
                                <span className="lg:text-base text-stone-700 capitalize line-clamp-1">{cat.name}</span>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OtherCategoriesList
