import { useState } from "react"
import ProcessGuide from "./ProcessGuide"

function HowItWorks() {
    const [target, setTarget] = useState("buyer");

    return (
        <div className="space-y-3 lg:space-y-9">
            <div className="flex gap-2 flex-col items-start lg:flex-row lg:justify-between lg:items-center">
                <h2 className="text-xl font-medium lg:text-2xl">How it Works</h2>
                <div className="flex gap-1 w-50 lg:w-70 ring ring-primary-lighter justify-between items-center rounded-full ">
                    <button className={`flex-1 rounded-full py-1 lg:py-2 px-2 lg:px-3 transition duration-300 cursor-pointer ${target === "buyer" ? "bg-primary-lighter transition duration-300 text-primary" : ""}`} 
                    onClick={()=> setTarget("buyer")}>For buyers</button>
                    <button className={`flex-1 rounded-full py-1 lg:py-2 px-2 lg:px-3 transition duration-300 cursor-pointer ${target === "seller" ? "bg-primary-lighter transition duration-300 text-primary" : ""}`} 
                    onClick={()=> setTarget("seller")}>For sellers</button>
                </div>
            </div>
            <ProcessGuide target={target}/>
        </div>
    )
}

export default HowItWorks
