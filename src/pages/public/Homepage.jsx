import { useEffect, useState } from "react";
import useCategories from "../../features/categories/useCategories";
import useSeller from "../../features/profiles/useSeller";
import useSearchSeller from "../../features/profiles/useSearchSeller";
import CategoriesList from "../../ui/CategoriesList";
import Hero from "../../ui/Hero";
import TopServicesellers from "../../ui/TopServicesellers";
import TopProductsellers from "../../ui/TopProductsellers";
import VerifiedSellers from "../../ui/VerifiedSellers";
import SplashScreen from "../../ui/SplashScreen";
import HowItWorks from "../../ui/HowItWorks";
import Faq from "../../ui/Faq";
import Stats from "../../ui/Stats";
import MainLayout from "../../layouts/MainLayout";

export default function Homepage(){
    const { loading: searchLoading, error: searchError, sellers: searchSellers, searchSellers: performSearch } = useSearchSeller();
    const { loading: categoriesLoading, categories, getAllCategories, error: categoryError } = useCategories();
    const {loading: sellersLoading, sellers, fetchAllSellers} = useSeller();
    const [query, setQuery] = useState("");

    useEffect(() => {
            const fetchData = async ()=> {
                try{
                    fetchAllSellers();
                    getAllCategories();
                }
                catch(err){
                    console.log("Batch Failed: ", err);
                }
            }
            fetchData();
        }, []);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        performSearch(searchQuery);
    };

    

    // Show loading spinner while fetching categories or sellers
    if (sellersLoading || categoriesLoading ) return <SplashScreen />;
    if (categoryError || searchError) return <NetworkError />;
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
                <Hero />
                <CategoriesList categories={categories} />
                <TopProductsellers sellers={sellers} categories={categories} />
                <Stats />
                <HowItWorks />
                <TopServicesellers sellers={sellers} categories={categories} />
                <Faq />
                {/* <VerifiedSellers />                 */}
            </main>
        </MainLayout>
    )
}
