import { useState } from "react"
import NavbarDash from "../features/Dashboard/NavbarDash"
import Sidebar from "../features/Dashboard/Sidebar"

function DashLayout({children}) {
    const [isOpen, setIsOpen] = useState(false);
    // const handleNav = ()=>{
    //     setIsOpen(true);
    // }
    return (
        <div className="flex">
            <div className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:relative ${isOpen ? "opacity-100" : "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto "}`}>
                <Sidebar isOpen={isOpen} setIsOpen={()=> setIsOpen(false)} />
            </div>
            <div className="flex-6">
                <nav className="bg-white px-3 py-2 lg:px-12 lg:py-3">
                    <NavbarDash setIsOpen={()=> setIsOpen(true)} />
                </nav>
                {children}
            </div>
        </div>
    )
}

export default DashLayout
