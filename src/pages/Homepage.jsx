import CategoriesList from "../ui/CategoriesList";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
import TopCategories from "../ui/TopCategories";
import Topsellers from "../ui/Topsellers";
import VerifiedSellers from "../ui/VerifiedSellers";

export default function Homepage(){
    return (
        <div className="space-y-6 lg:space-y-12">
            <div className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                <Navbar />
            </div>
            <main className="space-y-4 px-4 py-2 lg:px-12 lg:py-3 lg:space-y-8">
                <Hero />
                <CategoriesList />
                <Topsellers />
                <TopCategories />
                <VerifiedSellers />
            </main>
        </div>
    )
}
