import Footer from "../ui/Footer"
import Navbar from "../ui/Navbar"

function MainLayout({children}) {
    return (
        <div className="flex flex-col justify-between h-dvh lg:h-full">
            <div className="space-y-6 lg:space-y-12">
                <nav className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                    <Navbar />
                </nav>

                {children}
            </div>

            <footer className="bg-primary-light p-3 lg:p-20">
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
