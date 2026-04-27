import { useState } from "react";
import { uploadSellerCoverImage } from "../../services/apiSellerImage";

function useSellerCoverImage(){
    const [coverImageLoading, setCoverImageLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    async function uploadCoverImage(sellerId, coverImage_url){
        setCoverImageLoading(true);
        setError(null);
        try{
            const data = await uploadSellerCoverImage(sellerId, coverImage_url);
            setCoverImage(data);
        }
        catch(err){
            console.log(err.message);
            setError(err.message);
            throw new Error(err?.message);
        }
        finally{
            setCoverImageLoading(false);
        }
    }

    return {coverImageLoading, error, coverImage, uploadCoverImage}
};

export default useSellerCoverImage;













