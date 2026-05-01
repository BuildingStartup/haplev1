import { Link, useNavigate } from "react-router-dom"
import NavbarAuth from "../features/authentication/NavbarAuth"
import { GoArrowLeft } from "react-icons/go"

function AuthLayout({children}) {
    const navigate = useNavigate();

    const handleBack = () => {
        // Check if there is history to go back to within the app
        if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
        } else {
        navigate('/', { replace: true });
        }
    };

    return (
        <div className="space-y-6 lg:space-y-12 flex flex-col justify-between h-dvh lg:h-full">
            <nav className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                <NavbarAuth />
            </nav>

            <button onClick={handleBack} className="px-4 lg:px-12 flex items-center gap-1 text-neutral-100">
                <GoArrowLeft className="text-base" />
                <span>Back</span>
            </button>            

            {children}

            <footer className="">
                <p className=" text-center text-neutral-100/60 lg:text-sm">Empowering student entrepreneurs &bull; Haple &copy;2026</p>
            </footer>
        </div>
    )
}

export default AuthLayout
