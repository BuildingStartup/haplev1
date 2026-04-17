import { TbPerfume } from "react-icons/tb";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";

function CategoriesList() {

    const category = [
        {
            name: "Clothes",
            icon: <HiShoppingBag />,
        },
        {
            name: "Perfumes",
            icon: <TbPerfume />,
        },
        {
            name: "Skincare",
            icon: <HiHeart />,
        },
        {
            name: "Make-Up",
            icon: <GiLipstick />,
        },
        {
            name: "Graphic Design",
            icon: <MdDesignServices />,
        },
        {
            name: "Nail Tech",
            icon: <HiSparkles />,
        },
        {
            name: "More",
            icon: <FaEllipsisH />,
        },
    ]

    return (
        <div className="space-y-3 lg:space-y-9">
            <h2 className="text-xl font-medium lg:text-2xl">Browse by Categories</h2>
            <div className="flex justify-between gap-2 lg:gap-4 overflow-x-hidden">
                {category.map((cat, index) => (
                    <div key={index} className="flex items-center py-1 px-8 rounded-xl justify-center bg-accent lg:p-6 flex-1">
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-white w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full">
                                <span className="text-primary text-base lg:text-lg">
                                    {cat.icon}
                                </span>
                            </div>
                            <span className="lg:text-base text-stone-700">{cat.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriesList
