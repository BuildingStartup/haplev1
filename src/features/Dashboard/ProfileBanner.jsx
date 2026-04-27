import { useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa"
import useSellerCoverImage from "../profiles/useSellerCoverImage";

function ProfileBanner({sellerInfo}) {
    const {coverImage, coverImageLoading, uploadCoverImage} = useSellerCoverImage(); 
    const [loadedImages, setLoadedImages] = useState({});    
    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
      };    


    function handleCoverChange(e){
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const selectedFile = files[0];
            
        // File type validation
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!validTypes.includes(selectedFile.type)){
            toast.error('Please upload a valid image file (JPG, PNG, or WEBP)');
            return;
        }
            
        // File size validation (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if(selectedFile.size > maxSize){
            toast.error('Image size must be less than 5MB');
            return;
        }      

        uploadCoverImage(sellerInfo?.id, selectedFile);
    };

    return (
        <div className="relative w-full h-45 lg:h-70">
            {coverImage || sellerInfo?.coverImage_url ? <img src={coverImage || sellerInfo?.coverImage_url} alt="seller banner" className={`h-full w-full object-cover rounded-lg 
            ${loadedImages[sellerInfo?.id] ? 'blur-0' : 'blur-md'}
            ${coverImageLoading ? 'blur-md' : ''}`}
            loading="lazy"
            onLoad={() => handleImageLoad(sellerInfo?.id)} /> 
            : <div className="h-full w-full object-cover rounded-lg bg-primary"></div>
            }
            <label>
                <div className="absolute top-2 lg:top-4 right-2 lg:right-6 flex items-center gap-2.5 text-white p-1 lg:p-2.5 ring ring-white rounded bg-neutral-100/15 cursor-pointer">
                    <input 
                        type="file"
                        name="coverImage_url"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleCoverChange}
                        className="hidden" 
                    />
                    <FaCamera />
                    <span>Change Cover</span>
                </div>
            </label>
        </div>
    )
}

export default ProfileBanner
