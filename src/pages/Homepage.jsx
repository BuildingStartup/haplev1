import CategoriesList from "../ui/CategoriesList";
import Hero from "../ui/Hero";
import Navbar from "../ui/Navbar";

export default function Homepage(){
    return (
        <div className="space-y-5">
            <Navbar />
            <Hero />
            <CategoriesList />
        </div>
    )
}
