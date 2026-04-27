import { useState } from "react";
import { uploadSellerAvatar } from "../../services/apiSellerImage";

function useSellerAvatar(){
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);

    async function uploadAvatar(sellerId, avatar_url){
        setAvatarLoading(true);
        setError(null);
        try{
            const data = await uploadSellerAvatar(sellerId, avatar_url);
            setAvatar(data);
        }
        catch(err){
            console.log(err.message);
            setError(err.message);
            throw new Error(err?.message);
        }
        finally{
            setAvatarLoading(false);
        }
    }

    return {avatarLoading, error, avatar, uploadAvatar}
};

export default useSellerAvatar;













