import NavbarAuth from "../features/authentication/NavbarAuth"

function AuthLayout({children}) {
    return (
        <div className="space-y-6 lg:space-y-12 flex flex-col justify-between h-dvh lg:h-full">
            <nav className="bg-white px-4 py-2 lg:px-12 lg:py-3">
                <NavbarAuth />
            </nav>            

            {children}

            <footer className="">
                <p className=" text-center text-neutral-100/60 lg:text-sm">Empowering student entrepreneurs &bull; Haple &copy;2026</p>
            </footer>
        </div>
    )
}

export default AuthLayout
