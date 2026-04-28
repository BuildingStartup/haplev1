import { useEffect, useState } from "react"
import NavbarDash from "../features/Dashboard/NavbarDash"
import Sidebar from "../features/Dashboard/Sidebar"
import Dashboard from "../pages/private/Dashboard";
import Profile from "../pages/private/Profile";
import Verification from "../pages/private/Verification";
import { useAuth } from "../context/AuthContext";
import useSeller from "../features/profiles/useSeller";
import SplashScreen from "../ui/SplashScreen";
import NetworkError from "../ui/NetworkError";
import Modal from "../ui/Modal";
import ConfirmAction from "../ui/ConfirmAction";
import useSignOut from "../features/authentication/useSignOut";

function DashLayout() {    
    const { loading: signOutLoading, handleSignOut } = useSignOut();
    const [isOpen, setIsOpen] = useState(false);
    const [tabName, setTabName] = useState("dashboard");
    const { user } = useAuth();
    const { fetchSellerById, seller: sellerInfo, loading, error } = useSeller();

    useEffect(() => {
        if (user?.id) fetchSellerById(user.id);
      }, [user]);

    if(loading) return <SplashScreen />;
    if(error) return <NetworkError />  
    return (
        <div className="flex">
            <div className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:relative ${isOpen ? "opacity-100" : "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto "}`}>
                <Sidebar isOpen={isOpen} setIsOpen={()=> setIsOpen(false)} setTabName={setTabName} tabName={tabName} />
            </div>
            <div className="flex-6">
                <nav className="bg-white px-3 py-2 lg:px-12 lg:py-3">
                    <NavbarDash setIsOpen={()=> setIsOpen(true)} sellerInfo={sellerInfo}  />
                </nav>

                {tabName === "dashboard" ? 
                    <Dashboard setTabName={setTabName} sellerInfo={sellerInfo} loading={loading} error={error} />
                    : tabName === "profile" ?
                    <Profile sellerInfo={sellerInfo} loading={loading} error={error} />
                    : <Verification setTabName={setTabName} />
                }

                <Modal.Window name={"signOut"}  noClose={true}>
                    <ConfirmAction action="sign out" onClick={handleSignOut} loading={signOutLoading} />
                </Modal.Window>
            </div>
        </div>
    )
}

export default DashLayout
