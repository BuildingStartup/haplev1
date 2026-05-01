import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useSearchSeller from "../features/profiles/useSearchSeller";
import useSellersCategorySlug from "../features/profiles/useSellersCategorySlug";
import useCategories from "../features/categories/useCategories";
import NetworkError from "./NetworkError";
import SpinnerDash from "./SpinnerDash";
import HeaderOperations from "./HeaderOperations";

function CategoryBusinessList(){
    const { catalog, slug } = useParams();    
    const [searchParams] = useSearchParams();
    const { loading: categoryLoading, getCategoryByCatalogAndSlug, error: categoryError } = useCategories();
    const { loading: sellersLoading, sellers, fetchSellersById } = useSellersCategorySlug();
    const { loading: searchLoading, error: searchError, sellers: searchSellers, searchSellers: performSearch } = useSearchSeller();
    const [query, setQuery] = useState("");

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        performSearch(searchQuery);
    };

    // Fetch category and then sellers
    useEffect(() => {
        async function fetchData() {
        try {
            const category = await getCategoryByCatalogAndSlug(catalog, slug);
            if (category?.id) {
            fetchSellersById(category.id);
            }
        } catch (err) {
            console.error("Error fetching category:", err);
        }
        }

        if (catalog && slug) {
        fetchData();
        }
    }, [catalog, slug]);

        
    
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    if (categoryLoading || sellersLoading ) return <SpinnerDash />;
    if (categoryError) return <NetworkError />

    const sortBy = searchParams.get("sortBy") || "latest";
    let sortedSellers ;
    
    if(sortBy === "latest") sortedSellers = [...sellers].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at) 
        );

    if(sortBy === "az") sortedSellers =[...sellers].sort((a, b) =>
          a.business_name.localeCompare(b.business_name)
        );

    const NumOfSellers = sortedSellers?.length;


    return (            
        <div className="space-y-3">
            <HeaderOperations NumOfSellers={NumOfSellers} />
            {NumOfSellers > 0 ? <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] lg:grid-cols-4 gap-2 md:gap-4">
                {sortedSellers.map((seller, index) => (
                    <div key={seller.id} className="rounded-xl lg:rounded-2xl overflow-hidden bg-white ">
                        <div className="relative h-40 lg:h-[219.98px]">
                            {seller.coverImage_url || seller.avatar_url ? (
                            <>
                            <img src={seller.coverImage_url || seller.avatar_url} alt={seller.business_name} className={`w-full h-full object-cover transition-all duration-500 ${
                            loadedImages[seller.id] ? 'blur-0' : 'blur-md'
                            }`} 
                            loading="lazy"
                            onLoad={() => handleImageLoad(seller.id)} />
                            <span className="absolute top-2 right-2 py-0 lg:py-1 px-3 bg-white/90 rounded-full text-primary font-medium text-xs lg:text-sm capitalize lg:top-4 lg:right-4">{slug}</span>
                                </>
                            ) : <div className=" absolute w-full h-full flex items-center justify-center bg-primary-lighter">
                                    <div className="text-xl text-center lg:text-2xl font-bold tracking-widest text-primary">{seller.business_name}</div>
                                    <span className="absolute top-2 right-2 py-0 lg:py-1 px-3 bg-white/90 rounded-full text-primary font-medium text-xs lg:text-sm capitalize lg:top-4 lg:right-4">{slug}</span>
                                </div>}
                        </div>
                        <div className="p-2 space-y-1 lg:p-6 lg:space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm lg:text-lg font-medium line-clamp-1">{seller.business_name}</h3>
                                {/* <img src="../checkIcon.svg" alt="verified" /> */}
                            </div>
                            <p className="lg:text-base text-neutral-100 line-clamp-1 ">{seller.description}</p>
                            <Link to={`/${seller.username}`}>
                                <button className="mt-3 lg:mt-6 bg-primary text-white w-full p-1.5 lg:p-2.5 lg:text-sm rounded cursor-pointer hover:bg-primary-light transition duration-200">View Profile</button>
                            </Link>
                        </div>
                    </div>
                ))
            }
            </div>
            : <div className="flex justify-center items-center gap-1 p-6 lg:p-12">
                <VscError className="text-base" />
                <p className="text-sm font-medium">No sellers found.</p>
            </div>
            }
        </div>
    )
}

export default CategoryBusinessList
