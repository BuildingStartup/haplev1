import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import SplashScreen from "../../ui/SplashScreen";
import useCategories from "../../features/categories/useCategories";
import useSearchSeller from "../../features/profiles/useSearchSeller";
// import SearchBar from "../../ui/SearchBar";
import NetworkError from "../../ui/NetworkError";
import MainLayout from "../../layouts/MainLayout";
import OtherCategoriesList from "../../ui/OtherCategoriesList";
import useSeller from "../../features/profiles/useSeller";
import SellersBusinessList from "../../ui/SellersBusinessList";
import CategoryBusinessList from "../../ui/CategoryBusinessList";



export default function AllSellers() {
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
  if (sellersLoading || categoriesLoading) return <SplashScreen />;
  if (categoryError || searchError) return <NetworkError />;
  return (
    <MainLayout>
          <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
            <div className="flex items-center">
              <Link to="/">
                <GoHome className="text-lg lg:text-xl hover:text-primary-light" />
              </Link>
              <h1 className="capitalize text-xl lg:text-3xl font-medium">/Sellers</h1>
            </div>
            <OtherCategoriesList categories={categories} />
            <CategoryBusinessList sellers={sellers} />
            {/* <SellersBusinessList sellers={sellers} /> */}
          </main>
    </MainLayout>
  );
}
