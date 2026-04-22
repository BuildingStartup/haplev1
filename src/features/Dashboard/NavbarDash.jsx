import { GoSearch } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

function NavbarDash() {
    return (
        <div className="flex gap-4 justify-end">

           <div className="p-2">
                <GoSearch className="text-lg text-neutral-300" />
           </div>
           <div className="relative p-2">
                <IoNotificationsOutline className="text-lg text-neutral-300" />
                <span className="absolute w-2 h-2 rounded-full bg-secondary-300 top-2 right-2"></span>
           </div>
           <div className="p-2 bg-primary-lighter rounded-full">
            <span className="text-sm text-primary-light font-medium">AC</span>
           </div>

        </div>
    )
}

export default NavbarDash
