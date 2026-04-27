import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Applayout from "./ui/Applayout"

import Homepage from "./pages/public/Homepage"
import SellerProfile from "./pages/public/SellerProfile"
import Login from "./pages/public/Login.jsx";
import SignUp from "./pages/public/SignUp.jsx";

import Profile from "./pages/private/Profile"
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
// import ResetPassword from "./Pages/ResetPassword.jsx";
// import ChangePassword from "./Pages/ChangePassword.jsx";
// import Success from "./UI/Success.jsx";

import Error404 from "./ui/Error404.jsx"
import { AuthProvider } from "./context/AuthContext.jsx";
import ProfileEdit from "./features/Dashboard/ProfileEdit.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/seller" element={<SellerProfile />} />
            {/* dashboard */}
            <Route path="/my-profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            {/* <Route path="/password-reset" element={<ResetPassword />} /> */}
            {/* <Route path="/new-password" element={<ChangePassword />} /> */}
            {/* <Route path="/success" element={<Success />} /> */}

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
