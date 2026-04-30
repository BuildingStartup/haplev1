import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoHome } from "react-icons/go";
import SplashScreen from "../../ui/SplashScreen";
import SellersList from "../../ui/SellersList";
import useSellersCategorySlug from "../../features/profiles/useSellersCategorySlug";
import useCategories from "../../features/categories/useCategories";
import useSearchSeller from "../../features/profiles/useSearchSeller";
// import SearchBar from "../../ui/SearchBar";
import NetworkError from "../../ui/NetworkError";
import MainLayout from "../../layouts/MainLayout";
import CategoryBusinessList from "../../ui/CategoryBusinessList";
import CategoriesList from "../../ui/CategoriesList";
import OtherCategoriesList from "../../ui/OtherCategoriesList";
import Dropdown from "../../ui/SortBy";
import HeaderOperations from "../../ui/HeaderOperations";



export default function CategorySellers() {
  const { catalog, slug } = useParams();  
  const { loading: categoriesLoading, categories, getAllCategories, error: categoriesError } = useCategories();
  const [query, setQuery] = useState("");

  // Fetch category and then sellers
  useEffect(() => {
      getAllCategories();
}, []);

  // Show loading spinner while fetching categories or sellers
  if (categoriesLoading) return <SplashScreen />;
  if (categoriesError) return <NetworkError />
  return (
    <MainLayout>
      <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3">
        <div className="flex items-center">
          <Link to="/">
            <GoHome className="text-lg lg:text-xl hover:text-primary-light" />
          </Link>
          <h1 className="capitalize text-xl lg:text-3xl font-medium">/{slug}</h1>
        </div>

        <OtherCategoriesList categories={categories} />
        <div className="space-y-3">          
          <HeaderOperations />
          <CategoryBusinessList />
        </div>

      </main>
    </MainLayout>
  );
}
