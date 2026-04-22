import NavbarDash from "../features/Dashboard/NavbarDash"
import Sidebar from "../features/Dashboard/Sidebar"

function DashLayout({children}) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-6">
                <nav className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                    <NavbarDash />
                </nav>
                {children}
            </div>
        </div>
    )
}

export default DashLayout
