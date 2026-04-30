import { GoArrowLeft } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import PortfolioCard from "../../ui/PortfolioCard";
import MainLayout from "../../layouts/MainLayout";
import useSeller from "../../features/profiles/useSeller";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSellerCategory from "../../features/categories/useSellerCategory";
import useSellerImages from "../../features/profiles/useSellerImages";
import SplashScreen from "../../ui/SplashScreen";
import NetworkError from "../../ui/NetworkError";

function SellerProfile() {
    const { username } = useParams();
    const {
        loading: sellerLoading,
        error: sellerError,
        seller: sellerInfo,
        fetchSellerByUsername,
    } = useSeller();
    const {
        fetchSellerCategory,
        loading: categoryLoading,
        error: categoryError,
        category,
    } = useSellerCategory();
    // const { handleIncrementWhatsappClicks, handleIncrementProfileViews } =
    //     useStats();
    const {
        loading: imagesLoading,
        error: imagesError,
        images: sellerImages,
        handleGetImages,
    } = useSellerImages();

    useEffect(() => {
        if (username) fetchSellerByUsername(username);
    }, [username]);

    useEffect(() => {
        if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
    }, [sellerInfo?.category_id]);

    useEffect(() => {
        if (sellerInfo?.id) handleGetImages(sellerInfo.id);
    }, [sellerInfo?.id]);

    // useEffect(() => {
    //     if (sellerInfo?.id) handleIncrementProfileViews(sellerInfo.id);
    // }, [sellerInfo?.id]);

    const handleChatClick = () => {
        if (sellerInfo?.id) handleIncrementWhatsappClicks(sellerInfo.id);
    };
   

    if (sellerLoading || categoryLoading || imagesLoading) return <SplashScreen />;
    if (sellerError || categoryError || imagesError) return <NetworkError />;
    if (!sellerInfo || !category) return <p>Seller not found</p>;
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3 mb-10">
                <Link to="/">
                    <div className="flex items-center gap-1 text-neutral-500">
                        <GoArrowLeft />
                        <span>Back to Homepage</span>
                    </div>
                </Link>
                <div className="mt-4 relative h-40 lg:h-80">
                    {sellerInfo.coverImage_url ? (
                    <img src={sellerInfo?.coverImage_url} alt="seller banner" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                        <div className="h-full flex items-center justify-center bg-primary-lighter rounded-lg">
                            <div className="text-xl lg:text-3xl font-bold tracking-widest text-primary">{sellerInfo?.business_name}</div>
                        </div>
                    )}
                    <span className="absolute py-1 px-4 text-xs lg:py-1.75 lg:px-7 font-medium rounded-full inset-ring inset-ring-white top-2 lg:top-6 left-2 lg:left-7 capitalize bg-white/60 backdrop-blur-md">{category?.name}</span>
                    <div className="absolute -bottom-7 lg:-bottom-15 left-7 lg:left-21.5 rounded-full overflow-hidden w-15 h-15 lg:w-40 lg:h-40 ring ring-primary flex items-center justify-center bg-white">
                        { sellerInfo.avatar_url ? (
                        <img src={sellerInfo.avatar_url} alt="seller logo" className="w-full h-full object-cover" />
                        ): (
                            <span className="text-primary font-bold text-xl lg:text-2xl">
                                {sellerInfo?.business_name.slice(0, 2).toUpperCase()}
                            </span>
                        )
                    }
                    </div>
                </div>
                <h1 className="mt-10  lg:mt-30 text-2xl lg:text-5xl font-semibold">{sellerInfo?.business_name}</h1>
                <div className="bg-white space-y-1 lg:space-y-3.5 p-2 lg:pl-10 lg:pr-50 lg:py-8 rounded-xl lg:rounded-2xl">
                    <h2 className="text-lg lg:text-xl font-medium">About</h2>
                    <p className="lg:text-sm">{sellerInfo?.description}</p>
                </div>

                <div className="bg-white space-y-1 lg:space-y-3.5 p-2 lg:px-10 lg:py-8 rounded-xl lg:rounded-2xl">
                    <h2 className="text-lg lg:text-xl font-medium">Portfolio</h2>
                    { sellerImages.length > 0 ? <div className="grid grid-flow-col auto-cols-[150px] lg:auto-cols-[264px] gap-2.5 no-scrollbar overflow-x-auto">
                        {sellerImages.map((item, index)=> (
                            <PortfolioCard sellerInfo={sellerInfo} key={item.id} item={item}/>
                        ))}
                    </div> : (
                        <div className="flex justify-center p-2">
                            <p className="lg:text-sm">No images listed yet.</p>
                        </div>
                    )}
                </div>

                {/* cta */}
                <div className="flex gap-1.5 lg:gap-2.5 items-center w-full lg:w-159.25">
                    <button className="flex items-center justify-center gap-1.5 lg:gap-2.5 bg-secondary-200 text-white p-1.5 lg:p-2.5 rounded-md w-fit">
                        <BsChat className="text-sm lg:text-lg" />
                        <span className="lg:text-sm">Chat on Whatsapp</span>
                    </button>
                    {/* <button className="bg-neutral-400 p-1.5 lg:p-2.5 rounded-md flex-1">
                        <span className="lg:text-sm">Request service</span>
                    </button> */}
                </div>

            </main>
        </MainLayout>
    )
}

export default SellerProfile
