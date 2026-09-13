import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";

function AccordionItem({ question, isOpen, onClick }) {
  return (
    <div className="w-full rounded-lg lg:rounded-xl border transition-colors duration-200 border-neutral-200 bg-white">
      <button
        className="flex items-center justify-between gap-4 w-full px-3 py-3 lg:px-5 lg:py-4 text-left cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <p className="text-xs lg:text-sm font-medium">{question.title}</p>
        <span
          className={`shrink-0 grid place-items-center h-6 w-6 lg:h-7 lg:w-7 rounded-full bg-primary-lighter text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {!isOpen ? (
            <GoPlus className="text-sm lg:text-base" />
          ) : (
            <HiMinus className="text-sm lg:text-base" />
          )}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-3 pb-3 lg:px-5 lg:pb-4 lg:text-sm text-primary-dark/70 leading-relaxed">
            {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
