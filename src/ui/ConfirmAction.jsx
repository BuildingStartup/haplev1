import { HiXMark } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";

export default function ConfirmAction({action, icon, onClick, loading,  onCloseModal}){

    function handleClick(){
        onClick?.();
        onCloseModal?.();
    }

    function handleCancel(){
        onCloseModal?.();
    }

    return (
        <div className="bg-white flex flex-col gap-3 p-3 lg:p-6 w-70 lg:w-130 mx-auto rounded-md">
            <button className="rounded-sm group cursor-pointer ml-auto" onClick={handleCancel}>
                <HiXMark className="text-lg lg:text-xl font-bold" />
              </button>
            <p className="text-center font-medium text-xl lg:text-2xl">Are you sure you want to {action}?</p>
            <div className="flex gap-4">
                <button className="flex-4 ring-2 ring-stone-300 p-1 lg:p-2 font-medium rounded cursor-pointer transition-all duration-100 hover:bg-stone-50 lg:text-lg" onClick={handleCancel}>Cancel</button>
                <button 
                className="flex-4 flex gap-2 items-center justify-center capitalize p-2 lg:p-3 bg-red-600 text-white rounded  cursor-pointer hover:bg-red-700 transition-all duration-100 lg:text-lg disabled:cursor-not-allowed"
                onClick={handleClick}
                disabled={loading}>
                    {loading && <SpinnerMini />}
                    <span>{action}</span>
                </button>
            </div>
        </div>
    );
}