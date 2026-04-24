import { Outlet } from "react-router-dom";
import Modal from "./Modal";

function Applayout(){
    return (
        <div className="bg-accent-light">
            <Modal>
                <Outlet />
            </Modal>
        </div>
    )
}



export default Applayout;

