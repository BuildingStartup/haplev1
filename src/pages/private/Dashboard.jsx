import SpinnerDash from "../../ui/SpinnerDash";
import NetworkError from "../../ui/NetworkError";
import { LuCrown } from "react-icons/lu";

function Dashboard({setTabName, sellerInfo, loading, error}) {
        
    if ( loading ) return <SpinnerDash />;
    if ( error ) return <NetworkError />;
    if (!sellerInfo) return <p>No seller data found</p>;
    return (
        <main className="space-y-8 px-3 py-2 lg:px-12 lg:py-3 h-screen no-scrollbar overflow-y-auto">
            <h1 className="text-xl lg:text-4xl">Welcome back, <span className="font-semibold capitalize">{sellerInfo.business_name}</span>👋</h1>

            <div className="flex items-start gap-1.5 bg-primary px-2 lg:px-4 py-3 lg:py-6 rounded-lg">

                <LuCrown className="text-2xl lg:text-4xl fill-secondary-600 text-secondary-500 mt-1.5" />
                <div className="flex-8 lg:flex-12 flex flex-col place-items-start gap-4.5">
                    <div className="space-y-0.5 lg:space-y-1.5">
                        <p className="text-white text-lg lg:text-2xl font-medium">New Feature Coming Soon!!! (Premium Sellers)</p>
                        <p className="lg:text-sm text-white/90">Subscribe to premium package to get featured on our homepage</p>
                    </div>
                    <button className="bg-white p-1.5 lg:p-2.5 text-primary font-medium rounded lg:text-sm cursor-not-allowed">Subscribe Now</button>
                </div>
            </div>

            <div className="ring ring-secondary-700 bg-secondary-700/6 rounded-lg space-y-2 lg:space-y-4 px-2 lg:px-4 py-3 lg:py-6">
                <div className="space-y-1 lg:space-y-2">
                    <p className="text-lg lg:text-2xl">View your profile</p>
                    <p className="lg:text-sm text-neutral-700">You can view your profile by clicking on the button below</p>
                </div>
                <button className="p-1.5 lg:p-2.5 rounded bg-primary text-white font-medium lg:text-sm cursor-pointer hover:bg-primary-light transition duration-200" 
                onClick={()=> setTabName("profile")}>View Profile</button>
            </div>

        </main>
    )
}

export default Dashboard
