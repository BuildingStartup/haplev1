import CategoriesList from "../ui/CategoriesList";
import Footer from "../ui/Footer";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";
import TopCategories from "../ui/TopCategories";
import Topsellers from "../ui/Topsellers";
import VerifiedSellers from "../ui/VerifiedSellers";

export default function Homepage(){
    return (
        <div className="space-y-6 lg:space-y-12">
            <nav className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                <Navbar />
            </nav>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
                <Hero />
                <CategoriesList />
                <Topsellers />
                <TopCategories />
                <VerifiedSellers />                
            </main>
            <footer className="bg-primary-light p-3 lg:p-20">
                <Footer />
            </footer>
        </div>
    )
}
