import { GoSearch } from "react-icons/go";
import { IoNotificationsOutline, IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function NavbarDash() {
    return (
        <div className="flex justify-between items-center lg:justify-end">

            <div className="flex items-center gap-1 lg:hidden">
                <IoReorderThreeOutline className="text-2xl" />
                <Link to="/">
                    <img src="../logo.svg" alt="logo" className="w-15" />
                </Link>
            </div>
           <div className="flex gap-2 lg:gap-4 items-center">
                <div className="p-2">
                        <GoSearch className="text-sm lg:text-lg text-neutral-300" />
                </div>
                <div className="relative p-2">
                        <IoNotificationsOutline className="text-sm lg:text-lg text-neutral-300" />
                        <span className="absolute w-2 h-2 rounded-full bg-secondary-300 top-2 right-2"></span>
                </div>
                <div className="p-1 lg:p-2 bg-primary-lighter rounded-full">
                    <span className="lg:text-sm text-primary-light font-medium">AC</span>
                </div>
           </div>

           
        </div>
    )
}

export default NavbarDash
