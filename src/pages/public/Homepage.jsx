import MainLayout from "../../layouts/MainLayout";
import CategoriesList from "../../ui/CategoriesList";
import Hero from "../../ui/Hero";
import TopServicesellers from "../../ui/TopServicesellers";
import TopProductsellers from "../../ui/TopProductsellers";
import VerifiedSellers from "../../ui/VerifiedSellers";
import useCategories from "../../features/categories/useCategories";
import { useEffect } from "react";
import SplashScreen from "../../ui/SplashScreen";
import HowItWorks from "../../ui/HowItWorks";
import Faq from "../../ui/Faq";

export default function Homepage(){
    const { loading: categoryLoading, categories, getAllCategories } = useCategories();
    useEffect(() => {
        getAllCategories();
      }, []);
    if(categoryLoading) return <SplashScreen />;
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
                <Hero />
                <CategoriesList categories={categories} />
                <TopProductsellers />
                <HowItWorks />
                <TopServicesellers />
                <Faq />
                {/* <VerifiedSellers />                 */}
            </main>
        </MainLayout>
    )
}
