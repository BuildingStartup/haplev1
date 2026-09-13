import Accordion from "./Accordion";

function Faq() {    
    return (
        <div className="mt-10 lg:mt-20">
            <div className="space-y-1">
                <h2 className="text-xl font-medium lg:text-2xl text-center">FAQ</h2>
                <p className="text-xs lg:text-sm text-neutral-500 text-center">Everything you need to know before you get started</p>
            </div>
            <Accordion />
        </div>
    )
}

export default Faq
