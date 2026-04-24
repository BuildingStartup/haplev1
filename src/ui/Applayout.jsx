import { Outlet } from "react-router-dom";

function Applayout(){
    return (
        <div className="bg-accent-light">
            <Outlet />
        </div>
    )
}



export default Applayout;

