import MainLayout from "../../layouts/MainLayout";
import CategoriesList from "../../ui/CategoriesList";
import Hero from "../../ui/Hero";
import TopCategories from "../../ui/TopCategories";
import Topsellers from "../../ui/Topsellers";
import VerifiedSellers from "../../ui/VerifiedSellers";
import useCategories from "../../features/categories/useCategories";
import { useEffect } from "react";

export default function Homepage(){
    const { loading: categoryLoading, categories, getAllCategories } = useCategories();
    useEffect(() => {
        getAllCategories();
      }, []);
    if(categoryLoading) return <p>loading</p>
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
                <Hero />
                <CategoriesList categories={categories} />
                <Topsellers />
                <TopCategories />
                <VerifiedSellers />                
            </main>
        </MainLayout>
    )
}
