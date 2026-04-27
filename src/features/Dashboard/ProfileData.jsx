import { HiOutlineCamera } from "react-icons/hi2"
import useSellerAvatar from "../profiles/useSellerAvatar";
import { useEffect, useState } from "react";

function ProfileData({sellerInfo, category}) {
    const {avatarLoading, avatar, uploadAvatar, error: avatarError} = useSellerAvatar(); //do this first

    
    const [loadedImages, setLoadedImages] = useState({});
    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
      };

    

    function handleAvatarChange(e){
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const selectedFile = files[0];
            
        // File type validation
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!validTypes.includes(selectedFile.type)){
            console.log('Please upload a valid image file (JPG, PNG, or WEBP)');
            return;
        }
            
        // File size validation (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if(selectedFile.size > maxSize){
            console.log('Image size must be less than 5MB');
            return;
        }      

        uploadAvatar(sellerInfo?.id, selectedFile);
    };

        
    
    return (
        <div className="flex-1 bg-white p-4 lg:p-4 rounded-lg space-y-3 flex flex-col items-center w-fit mx-auto">
            <div className="relative w-25 lg:w-57.5 h-25 lg:h-57.5 overflow-hidden ring ring-primary rounded-full">
                <img src={ avatar || sellerInfo?.avatar_url ||`../personTransparentbg.webp`}alt="seller logo" 
                className={`w-full h-full rounded-full transition-all duration-500 
                ${loadedImages[sellerInfo?.id] ? 'blur-0' : 'blur-md'}
                ${avatarLoading ? 'blur-md' : ''}`}
                loading="lazy"
                onLoad={() => handleImageLoad(sellerInfo?.id)} />
                <label className="flex items-center justify-center cursor-pointer overflow-hidden ">
                    <input 
                        type="file"
                        name="avatar_url"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleAvatarChange}
                        className="hidden" 
                    />
                    <HiOutlineCamera className="text-lg lg:text-2xl absolute bottom-3 lg:bottom-8 right-3 lg:right-8 fill-white stroke-primary" strokeWidth={2}/>
                </label>
            </div>
            <div className="p-1 lg:p-2.5 flex flex-col justify-center items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-semibold">The {sellerInfo.business_name}</h1>
                <span className=" capitalize py-1.5 px-6 rounded-full bg-neutral-100/16">{category?.name}</span>
            </div>
        </div>
    )
}

export default ProfileData
