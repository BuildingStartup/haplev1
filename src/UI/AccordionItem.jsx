import { useState } from "react";
import { GoPlus } from "react-icons/go"
import { HiMinus } from "react-icons/hi2"

function AccordionItem({question, isOpen, onClick}) {

    return (
        <div className="w-full border-b border-b-neutral-500/10 last:border-b-0 py-2 lg:py-4 ">
            <button className="flex justify-between w-full" onClick={onClick}>
                <p className="text-xs lg:text-sm font-medium">{question.title}</p>
                <span>
                    {!isOpen ? <GoPlus className="text-lg text-primary cursor-pointer"  /> :
                    <HiMinus className="text-lg text-primary cursor-pointer"/>}
                </span>
            </button> 
            <div
                className={`overflow-hidden p-1 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="lg:text-sm text-primary-dark">{question.answer}</div>
            </div>
        </div>
    )
}

export default AccordionItem
