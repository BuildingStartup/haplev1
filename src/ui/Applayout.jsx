import { Outlet } from "react-router-dom";
import Homepage from "../pages/Homepage";

function Applayout(){
    return (
        <div className="bg-accent-light">
            <Outlet />
        </div>
    )
}



export default Applayout;

