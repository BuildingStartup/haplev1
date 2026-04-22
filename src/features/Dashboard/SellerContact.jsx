import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
// import { formatDateFns } from "../utils/helpers";

export default function SellerContact({sellerInfo, category}){
  

    // const date_created = formatDateFns(sellerInfo?.created_at);

    return (
        <div className="flex flex-col gap-3.5">

            <div className="flex items-center gap-3 text-dark-100">          
            <MdOutlineCategory className="text-lg"/>
            <p className="text-sm capitalize">
                {category?.catalog ?? "General"} ({category?.name ?? "Uncategorized"})
            </p>
            </div>

            <div className="flex items-center gap-3 text-dark-100">          
            <FaWhatsapp className="text-lg"/>
            <p className="text-sm">
                {sellerInfo.whatsapp_number}
            </p>
            </div>

            <div className="flex items-center gap-3 text-dark-100">
            <FcCalendar className="text-lg" />
            <p className="text-sm">
                24th April, 2026
            </p>
            </div>

            <div className="flex items-center gap-3 text-dark-100">
            <GoLocation className="text-lg" />
            <p className="text-sm">
                {sellerInfo.campus}
            </p>
            </div>

            

        </div>
    )
}