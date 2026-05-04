import { lazy, useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext.jsx";

import Applayout from "./ui/Applayout.jsx"
import Homepage from "./pages/public/Homepage.jsx"
import Error404 from "./ui/Error404.jsx"
import ProtectedRoute from "./ui/ProtectedRoute.jsx";


const Login = lazy(() => import("./pages/public/Login.jsx"));
const SellerProfile = lazy(() => import("./pages/public/SellerProfile.jsx"));
const SignUp = lazy(() => import("./pages/public/SignUp.jsx"));
const ResetPassword = lazy(() => import("./pages/public/ResetPassword.jsx"));
const UpdatePassword = lazy(() => import("./pages/public/updatePassword.jsx"));
const CategorySellers = lazy(() => import("./pages/public/CategorySellers.jsx"));
const AllSellers = lazy(() => import("./pages/public/AllSellers.jsx"));

import DashLayout from "./layouts/DashLayout.jsx";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_PRODUCTION = import.meta.env.PROD;

function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!IS_PRODUCTION || !GA_MEASUREMENT_ID) return;

    ReactGA.send({
      hitType: "pageview",
      page: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    if (!IS_PRODUCTION || !GA_MEASUREMENT_ID) return;
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);
  return (
    <>
      <BrowserRouter>
      {IS_PRODUCTION && <Analytics />}
      <GoogleAnalyticsTracker />
      <AuthProvider>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/:username" element={<SellerProfile />} />
            <Route path="/:catalog/:slug" element={<CategorySellers />} />
            <Route path="/allSellers" element={<AllSellers />} />


            {/* dashboard */}
            <Route path="/my-profile" element={
              <ProtectedRoute>
                <DashLayout />
              </ProtectedRoute>
            } />
            
            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/password-reset" element={<ResetPassword />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            

            {/* fallback route */}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "11px",
            maxWidth: "500px",
            padding: "16px 20px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  )
}



export default App;
