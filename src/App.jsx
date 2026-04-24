import { Routes, Route, BrowserRouter } from "react-router-dom";
import Applayout from "./ui/Applayout"
import Homepage from "./pages/public/Homepage"
import SellerProfile from "./pages/public/SellerProfile"
import Profile from "./pages/private/Profile"
import Login from "./Pages/Login.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Success from "./UI/Success.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  );


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/seller" element={<SellerProfile />} />
            <Route path="/my-profile" element={<Profile />} />
//               auth
            <Route path="/login" element={<Login />} />
            <Route path="/password-reset" element={<ResetPassword />} />
            <Route path="/new-password" element={<ChangePassword />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/success" element={<Success />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
