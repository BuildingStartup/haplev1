import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { MdOutlineDashboard } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

function Navbar() {
    const {user} = useAuth();
    
    return (
        <div className="flex justify-between items-center">

                <picture className="w-13 lg:w-18">
                <Link to="/">
                    <img src="../logo.svg" alt="logo" className="w-full" />
                </Link>
                </picture>

            {user ? (
                <Link to="/my-profile">
                <button className="p-1 lg:p-2 bg-primary-lighter rounded-full cursor-pointer">                    
                    <span className="lg:text-sm text-primary-light font-medium">{(user?.user_metadata?.business_name || user?.email || "?").slice(0, 2).toUpperCase()}</span>
                </button>
                </Link>
            ): 
            (
            <div className="flex gap-2 lg:gap-3.5">
                <button className="ring-1 ring-neutral-400 px-3 py-1 capitalize rounded font-medium shadow-md lg:px-6 lg:py-2">
                    <Link to="/login">
                        login
                    </Link>
                </button>
                <button className="ring-1 bg-primary text-white px-3 py-1 rounded shadow-md lg:px-6 lg:py-2">
                    <Link to="/signUp">
                        Join as a seller
                    </Link>
                </button>
            </div>
            )}

        </div>
    )
}

export default Navbar
