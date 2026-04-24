function Navbar() {
    return (
        <div className="flex justify-between items-center">

            <picture className="w-13 lg:w-18">
                <img src="../logo.svg" alt="logo" className="w-full" />
            </picture>

            <div className="flex gap-2 lg:gap-3.5">
                <button className="ring-1 ring-neutral-400 px-3 py-1 capitalize rounded font-medium shadow-md lg:px-6 lg:py-2">login</button>
                <button className="ring-1 bg-primary text-white px-3 py-1 rounded shadow-md lg:px-6 lg:py-2">Join as a seller</button>
            </div>

        </div>
    )
}

export default Navbar
