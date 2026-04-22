import { MdOutlineDashboard } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GoVerified, GoSignOut } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
function Sidebar() {
    return (
        <aside className="flex-1 bg-primary-light px-3 py-6 flex flex-col gap-7 h-screen">
            <picture className="px-3">
                <img src="../logo-white.svg" alt="logo" className="" />
            </picture>
            <div className="px-4 space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <MdOutlineDashboard className="text-lg" />
                    <span className="text-base">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <BsPerson className="text-lg" />
                    <span className="text-base">Profile</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <GoVerified className="text-lg" />
                    <span className="text-base">Verification</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <BsCart2 className="text-lg" />
                    <span className="text-base">Request</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white hover:text-primary transition ease-in-out duration-200 cursor-pointer">
                    <GoSignOut className="text-lg" />
                    <span className="text-base">Signout</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
