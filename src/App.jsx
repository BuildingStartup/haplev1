import { BrowserRouter, Route, Routes } from "react-router-dom"
import Applayout from "./ui/Applayout"
import Homepage from "./pages/Homepage"
import SellerProfile from "./pages/SellerProfile"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/seller" element={<SellerProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

