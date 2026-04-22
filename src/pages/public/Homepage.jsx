import MainLayout from "../../layouts/MainLayout";
import CategoriesList from "../../ui/CategoriesList";
import Hero from "../../ui/Hero";
import TopCategories from "../../ui/TopCategories";
import Topsellers from "../../ui/Topsellers";
import VerifiedSellers from "../../ui/VerifiedSellers";

export default function Homepage(){
    return (
        <MainLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
                <Hero />
                <CategoriesList />
                <Topsellers />
                <TopCategories />
                <VerifiedSellers />                
            </main>
        </MainLayout>
    )
}
