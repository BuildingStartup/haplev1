import { useForm } from "react-hook-form";
import useUpdateSeller from "../profiles/useUpdateSeller";
import { useEffect, useState } from "react";
import Fields from "../../ui/Fields";
import FieldDescription from "../../ui/FieldDescription";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiXMark } from "react-icons/hi2";


export default function ProfileEdit({onCloseModal, sellerInfo}){
    const {loading: updateLoading, updateSeller} = useUpdateSeller();
    const { register, setValue, watch, handleSubmit, formState: { errors },} = useForm({
        values: sellerInfo || {},
        resetOptions: {
            keepDirtyValues: true, //retains user input if they started editing early
            keepErrors: true, //keeps any validation errors visible
        }
      }); 
          

    useEffect(() => {
      if (sellerInfo?.whatsapp_number) {
        const localDigits = sellerInfo.whatsapp_number.replace(/^\+234/, "").replace(/\D/g, "").slice(0, 10);
        setValue("whatsapp_number", localDigits);
      }
    }, [sellerInfo?.whatsapp_number, setValue]);
    
    
    const onSubmit = (data) => {
        if (!data.description || !data.whatsapp_number) return; 
        
        const whatsappDigits = (data.whatsapp_number || "").replace(/\D/g, "").slice(0, 10);

        const updateData = {
        username: data.business_name.toLowerCase().replace(/\s+/g, ""), //generate username from business name
        business_name: data.business_name,
        description: data.description,
        whatsapp_number: `+234${whatsappDigits}`,
        };
        //api call;
        updateSeller(sellerInfo.id, updateData, onCloseModal);
    };  

    const handleWhatsAppChange = (value) => {
    const cleanedNumber = value.replace(/\D/g, "").slice(0, 10);

    setValue("whatsapp_number", cleanedNumber);
  };  

  function handleCancel(){
    onCloseModal?.();
  }

   
    return (
      <div className="flex items-center justify-center">        

        <div className="w-80 lg:w-130 lg:h-full flex flex-col px-4 py-2 lg:py-6 bg-white rounded">  
              <button className="p-1.5 rounded-sm group cursor-pointer ml-auto" onClick={handleCancel}>
                <HiXMark className="text-lg lg:text-xl font-bold" />
              </button>      
              {/* Header */}
              <div className="text-center space-y-1">
                <h2 className="text-lg lg:text-xl font-medium text-primary mb-3">
                  Edit Profile
                </h2>
              </div>
        
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
                
                {/* Business Name */}
                <Fields
                  register={register}
                  labelName="Business Name"
                  forTag="business_name"
                  errors={errors}
                  errorMessage="Business Name is Required"
                  placeholder="DesignByJoel"
                  type="text"
                  />
        
                {/* Description */}
                <FieldDescription
                  register={register}
                  labelName="Description"
                  forTag="description"
                  errors={errors}
                  errorMessage="Description is Required"
                  placeholder="What buyers will know about you"
                  type="text"
                />

                {/* Contact Info */}        
                <Fields
                    forTag="whatsapp_number"
                    labelName="WhatsApp Number"
                    validation={{
                      value: /^\d{10}$/,
                      message: "Enter 10 digits after +234",
                    }}
                    placeholder="9012345678"
                    type="tel"
                    errorMessage="Enter a valid WhatsApp number"
                    errors={errors}
                    register={register}
                    prefix="+234"
                    onChange={(e) => handleWhatsAppChange(e.target.value)}
                  />
        
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                    disabled={updateLoading}
                  >
                    {updateLoading && <SpinnerMini />}
                    <span>Save Changes</span>
                  </button>

            </form>
        </div>
        </div>
    )
}



