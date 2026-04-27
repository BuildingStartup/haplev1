import { MdOutlineDashboard } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GoVerified, GoSignOut } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
function Sidebar({isOpen, setIsOpen}) {
    return (
        <aside className={`fixed inset-y-0 left-0 z-30 w-2/3 transform p-4 transition-transform duration-300 ease-in-out lg:relative  lg:w-full lg:translate-x-0 lg:flex-1 bg-primary-light px-3 py-6 lg:flex flex-col gap-7 h-dvh lg:h-full ${isOpen ? "flex translate-x-0" : "-translate-x-full"}`}>
            <picture className="flex items-center px-3">
                <Link to="/">
                    <img src="../logo-white.svg" alt="logo" className="w-20 lg:w-full" />
                </Link>
                <button className="lg:hidden group cursor-pointer ml-auto">
                    <HiXMark className="text-lg lg:text-xl font-bold text-white" onClick={setIsOpen} />
                </button>
            </picture>
            <div className="px-4 space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <MdOutlineDashboard className="text-lg" />
                    <span className="text-sm lg:text-base">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <BsPerson className="text-sm lg:text-base" />
                    <span className="text-sm lg:text-base">Profile</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <GoVerified className="text-sm lg:text-base" />
                    <span className="text-sm lg:text-base">Verification</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <BsCart2 className="text-sm lg:text-base" />
                    <span className="text-sm lg:text-base">Request</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <GoSignOut className="text-sm lg:text-base" />
                    <span className="text-sm lg:text-base">Signout</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
