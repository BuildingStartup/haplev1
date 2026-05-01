import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import SplashScreen from "./SplashScreen";
import NetworkError from "./NetworkError";

function ProtectedRoute({children}){
    //1. Load the authenticated user
    const {user, loading: isLoading, error, loadUser} = useUser();

    useEffect(()=>{
        loadUser();
    }, []);    
   

    //2. while loading, show a splashscreen
    if(isLoading) return (
        <div>
            <SplashScreen />
        </div>
    )

    if(error) return (
        <NetworkError />
    )

    
    //3. if there IS an authenticated user, show the protected page  
    if(user) return children;
    
    // If no user, redirect to login
    if(!user && !isLoading){
        return <Navigate to="/login" replace />;
    }
}


export default ProtectedRoute;