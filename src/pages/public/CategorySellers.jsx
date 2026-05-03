import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { GoHome, GoSearch } from "react-icons/go";
import SplashScreen from "../../ui/SplashScreen";
import useCategories from "../../features/categories/useCategories";
import NetworkError from "../../ui/NetworkError";
import MainLayout from "../../layouts/MainLayout";
import CategoryBusinessList from "../../ui/CategoryBusinessList";
import OtherCategoriesList from "../../ui/OtherCategoriesList";



export default function CategorySellers() {
  const { slug } = useParams();  
  const { loading: categoriesLoading, categories, getAllCategories, error: categoriesError } = useCategories();  
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  // Fetch category and then sellers
  useEffect(() => {
      getAllCategories();
  }, []);

  function handleSearch(e, query){
    e.preventDefault();
    searchParams.set("searchQuery", query)
    setSearchParams(searchParams)
  }

  // Show loading spinner while fetching categories or sellers
  if (categoriesLoading) return <SplashScreen />;
  if (categoriesError) return <NetworkError />
  return (
    <MainLayout>
      <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center">
            <Link to="/">
              <GoHome className="text-lg lg:text-xl hover:text-primary-light" />
            </Link>
            <h1 className="capitalize text-xl lg:text-3xl font-medium">/{slug}</h1>
          </div>

          <form onSubmit={(e)=> handleSearch(e, query)} className="flex justify-between items-center gap-2 bg-white rounded-full py-1 px-1 lg:p-2 lg:w-120">
              <div className="flex items-center gap-1 flex-1 px-3 lg:gap-3">
                  <GoSearch className="lg:text-lg" />
                  <input 
                  type="text" 
                  className="w-full outline-0 focus-0 py-1 lg:py-2 lg:text-base" 
                  placeholder="Search for hair food, or design&hellip;"
                  value={query}
                  onChange={(e)=> setQuery(e.target.value)}/>
              </div>
            <button className="bg-primary text-white py-1 px-3 rounded-full lg:py-2 lg:px-5 cursor-pointer">Search</button>
          </form>

        </div>

        <OtherCategoriesList categories={categories} />  
        <CategoryBusinessList />

      </main>
    </MainLayout>
  );
}
