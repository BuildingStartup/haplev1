import { useState } from "react";
import AccordionItem from "./AccordionItem";

function Accordion() {    
    const [openIndex, setOpenIndex] = useState(null);
    const questions = [
        {
            title: "Do I need an account to shop?",
            answer: "Nope. You can browse all stores and products without signing up. Just tap a profile and message the seller directly on WhatsApp to buy.",
        },
        {
            title: "How much does it cost to sell on Haple?",
            answer: "100%. Set up your store free and start getting seen. We're here to help you grow.",
        },
        {
            title: "How do I pay?",
            answer: "You and the seller sort it out - transfer, cash, whatever vibes. We just link you up.",
        },
        {
            title: "Who handles delivery?",
            answer: "You do. Buyers hit you up on WhatsApp, you close the sale your way. We bring the customers.",
        },
        {
            title: "Can I trust the sellers?",
            answer: "Yes, for now. All Haple sellers are on campus but we'll be launching a verification feature for sellers soon. Be on the look out.",
        },
    ]
    
    const handleToggle = (index) => {
        // If clicked item is already open, close it (null), otherwise open it
        setOpenIndex(openIndex === index ? null : index);
      };

    return (
        <div className="bg-white p-2 rounded lg:w-200 lg:mx-auto lg:p-3">
                {questions.map((question, index)=> (
                    <AccordionItem question={question} key={index} isOpen={openIndex === index} onClick={()=> handleToggle(index)} />
                ))}
        </div>
    )
}

export default Accordion
