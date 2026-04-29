import { useState } from "react";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ id: 'newest', label: 'Newest First' })

    const options = [
        { id: 'newest', label: 'Newest First' },
        { id: 'popular', label: 'Popular' },
        { id: 'recommended', label: 'Recommended' },
      ];

    function handleDropdown(){
        setIsOpen((prev)=> !prev);
    }

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        // Add your sorting logic here
    };

    return (
        <div className="relative inline-block text-left lg:w-48">
        {/* <!-- Trigger Button --> */}
        <button type="button" className="group inline-flex justify-between gap-2 w-full rounded-md border border-gray-300 bg-white px-2 lg:px-4 py-1 lg:py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-300/6 focus:outline-none focus:ring-2 focus:ring-primary-lightest cursor-pointer" onClick={handleDropdown}>
          <span className="flex items-center">
            <svg class="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {selectedOption.label}
          </span>
          <MdKeyboardArrowDown className="text-lg lg:text-xl"  />
        </button>
      
        {/* <!-- Dropdown Options --> */}
        {isOpen && <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/50 ring-opacity-5 focus:outline-none">
          <div className="py-1 shadow-md">

            {options.map((option)=> (
                <button key={option.id}
                onClick={()=>handleSelect(option)} 
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-neutral-100 cursor-pointer hover:bg-primary-light hover:text-white transition-colors" role="menuitem">
                <span>{option.label}</span>
                {selectedOption.id === option.id &&<MdCheck className="text-primary" />}
              </button>
            ))}
            
          </div>
        </div>}

      </div>
    )
}

export default Dropdown
