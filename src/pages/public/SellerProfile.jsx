import { GoArrowLeft } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import PortfolioCard from "../../ui/PortfolioCard";
import MainLayout from "../../layouts/MainLayout";

function SellerProfile() {
    const portfolio = [
        {
            name: "Spicy Jellof Rice with Chicken",
            description: "Available",
            image_url: "photo",
        },
        {
            name: "Spicy Jellof Rice with Chicken",
            description: "Available",
            image_url: "photo",
        },
        {
            name: "Spicy Jellof Rice with Chicken",
            description: "Available",
            image_url: "photo",
        },
        {
            name: "Spicy Jellof Rice with Chicken",
            description: "Available",
            image_url: "photo",
        },
        {
            name: "Spicy Jellof Rice with Chicken",
            description: "Available",
            image_url: "photo",
        },
    ]
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3 mb-10">
                <div className="flex items-center gap-1 text-neutral-500">
                    <GoArrowLeft />
                    <span>Back to Homepage</span>
                </div>
                <div className=" relative h-40 lg:h-full">
                    <img src="../sellerBanner.jpg" alt="seller banner" className="h-full w-full object-cover rounded-lg" />
                    <span className="absolute py-1 px-4 text-xs lg:py-1.75 lg:px-7 font-medium rounded-full inset-ring inset-ring-white text-white top-2 lg:top-6 left-2 lg:left-7">Food</span>
                    <div className="absolute -bottom-7 lg:-bottom-15 left-7 lg:left-21.5 rounded-full overflow-hidden w-15 h-15 lg:w-51 lg:h-51 ring ring-primary">
                        <img src="../seller1.jpg" alt="seller logo" className="w-full h-full" />
                    </div>
                </div>
                <h1 className="mt-10  lg:mt-30 text-2xl lg:text-5xl font-semibold">The Brunch Box </h1>
                <div className="bg-white space-y-1 lg:space-y-3.5 p-2 lg:pl-10 lg:pr-50 lg:py-8 rounded-xl lg:rounded-2xl">
                    <h2 className="text-lg lg:text-xl font-medium">About</h2>
                    <p className="lg:text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore nobis commodi. Repudiandae laudantium doloremque illum unde nulla explicabo quam omnis consectetur debitis corporis placeat qui laboriosam vel, libero architecto.</p>
                </div>

                <div className="bg-white space-y-1 lg:space-y-3.5 p-2 lg:px-10 lg:py-8 rounded-xl lg:rounded-2xl">
                    <h2 className="text-lg lg:text-xl font-medium">Portfolio</h2>
                    <div className="grid grid-flow-col auto-cols-[150px] lg:auto-cols-[264px] gap-2.5 no-scrollbar overflow-x-auto">
                        {portfolio.map((item, index)=> (
                            <PortfolioCard index={index} item={item}/>
                        ))}
                    </div>
                </div>

                {/* cta */}
                <div className="flex gap-1.5 lg:gap-2.5 items-center w-full lg:w-159.25">
                    <button className="flex items-center justify-center gap-1.5 lg:gap-2.5 bg-secondary-200 text-white p-1.5 lg:p-2.5 rounded-md flex-1">
                        <BsChat className="text-sm lg:text-lg" />
                        <span className="lg:text-sm">Chat on Whatsapp</span>
                    </button>
                    <button className="bg-neutral-400 p-1.5 lg:p-2.5 rounded-md flex-1">
                        <span className="lg:text-sm">Request service</span>
                    </button>
                </div>

            </main>
        </MainLayout>
    )
}

export default SellerProfile
