import { useState } from "react";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md"
import { useSearchParams } from "react-router-dom";

function Filter({options}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ id: 'all', label: 'All' })
    const [searchParams, setSearchParams] = useSearchParams();

    const filter = searchParams.get("filter") || "All";

    function handleChange(option){
        setSelectedOption(option);
        searchParams.set("filter", option.id);
        setSearchParams(searchParams);
        setIsOpen(false);
    }

    function handleFilter(){
        setIsOpen((prev)=> !prev);
    }

    return (
        <div className="relative inline-block text-left lg:w-48">
        {/* <!-- Trigger Button --> */}
        <button type="button" className="group inline-flex justify-between gap-2 w-full rounded-md border border-gray-300 bg-white px-2 lg:px-4 py-1 lg:py-2 lg:text-sm font-medium text-neutral-100 capitalize hover:bg-neutral-300/6 focus:outline-none focus:ring-2 focus:ring-primary-lightest cursor-pointer" onClick={handleFilter}>
          <span className="flex items-center">
            <svg class="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {filter}
          </span>
          <MdKeyboardArrowDown className="text-lg lg:text-xl"  />
        </button>
      
        {/* <!-- filter Options --> */}
        {isOpen && <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/50 ring-opacity-5 focus:outline-none">
          <div className="py-1 shadow-md">

            {options.map((option)=> (
                <button key={option.id}
                onClick={()=> handleChange(option)} 
                className="flex items-center justify-between w-full px-4 py-2 lg:text-sm text-neutral-100 cursor-pointer hover:bg-primary-light hover:text-white transition-colors" role="menuitem">
                <span>{option.label}</span>
                {selectedOption.id === option.id &&<MdCheck className="text-primary" />}
              </button>
            ))}
            
          </div>
        </div>}

      </div>
    )
}

export default Filter
