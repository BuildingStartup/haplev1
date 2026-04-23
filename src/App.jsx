import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Success from "./UI/Success.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/new-password" element={<ChangePassword />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
