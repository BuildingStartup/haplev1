import { useState } from "react";
import { GoSearch } from "react-icons/go"
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();   

    
    function handleSearch(e, query){
        e.preventDefault();
        searchParams.set("searchQuery", query)
        setSearchParams(searchParams)
        navigate(`/allSellers/?${searchParams}`)
    }

    return (
        <form onSubmit={(e)=> handleSearch(e, query)} className="flex justify-between items-center gap-2 bg-white w-fit mx-auto rounded-full py-1 px-1 lg:p-2 lg:w-md">
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
    )
}

export default Search
