import { GoSearch } from "react-icons/go";
function Hero() {
    return (
        <div className=" bg-linear-to-r from-primary to-primary-dark py-4 px-2 flex justify-center items-center rounded-xl relative overflow-hidden lg:p-16">
            <div className="w-20 h-20 bg-primary-light absolute -top-8 -left-8 lg:-top-6 lg:-left-6 lg:w-35 lg:h-35 rounded-full blur-lg opacity-55 "></div>
            <div className="space-y-2 p-4 lg:space-y-4 lg:p-6">
                <h1 className="text-2xl text-white text-center font-medium md:text-3xl lg:text-5xl">
                    Find trusted<br/> sellers on campus
                </h1>

                <p className="text-stone-300 text-center lg:text-lg">
                    Discover student businesses, connect via Whatsapp and get what you need fast
                </p>

                <form className="flex justify-center items-center gap-2 bg-white w-fit mx-auto rounded-full py-1 px-1">
                    <div className="flex items-center gap-1 px-3 lg:gap-3">
                        <GoSearch />
                        <input type="text" className="outline-0 focus-0 py-1 lg:py-2" placeholder="Search for hair food, or design"/>
                    </div>
                    <button type="submit" className="bg-primary text-white py-1 px-3 rounded-full lg:py-2 lg:px-5">Search</button>
                </form>

            </div>
            <div className="w-20 h-20 bg-neutral-100 absolute -bottom-10 -right-10 lg:-bottom-8 lg:-right-8 lg:w-35 lg:h-35 rounded-full blur-lg opacity-15"></div>
        </div>
    )
}


export default Hero
