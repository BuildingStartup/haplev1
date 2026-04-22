import { BrowserRouter, Route, Routes } from "react-router-dom"
import Applayout from "./ui/Applayout"
import Homepage from "./pages/public/Homepage"
import SellerProfile from "./pages/public/SellerProfile"
import Profile from "./pages/private/Profile"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/seller" element={<SellerProfile />} />
            <Route path="/my-profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

