import supabase, {supabaseUrl} from "./supabase";


async function uploadSingleSellerImage(imageFile, sellerId, position, name, caption, onProgress){
     //1. checking if it has an image path already
        const hasImagePath = imageFile?.startsWith?.(supabaseUrl);
    
        //2. create an image name
        //choose a base for the image name: existing path, string name, file.name or fallback image.
    
        const imageBase = hasImagePath ? imageFile
        : (typeof imageFile === "string" 
            ? imageFile : imageFile?.name
            || "image");
        
        const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
        
        

        const filePath = `seller-${sellerId}/${imageName}`;


    
    
    //upload to supabase storage
    if (onProgress) onProgress(10); // start progress

    const {error: uploadError, } = await supabase.storage
        .from("seller-images")
        .upload(filePath, imageFile, { 
          cacheControl: '3600',
          upsert: false 
        });
    
    if(uploadError){
        throw new Error(uploadError.message);
    }

    if (onProgress) onProgress(60); // progress mid-upload

    //get public url
    const {data: publicUrlData, error: publicUrlError} = supabase.storage
        .from("seller-images")
        .getPublicUrl(filePath);
    
        if(publicUrlError){
            throw new Error(publicUrlError.message);
        }
    
        const imageUrl = publicUrlData.publicUrl;
        if (onProgress) onProgress(80); // progress after URL generated

        //insert into seller-images table
        const {data, error: insertError} = await supabase
        .from("seller_images")
        .insert([{
            seller_id: sellerId,
            image_url: imageUrl,
            position: position,
            name: name,
            caption: caption,
            },
        ])
        .select()
        .single()

        if(insertError){
            //delete the uploaded image if db insert fails
            await supabase.storage
            .from("seller-images")
            .remove([filePath]);
            throw new Error(insertError.message);
        }

        if (onProgress) onProgress(100); // complete
        return data;
};  

export async function uploadSellerImage(imageFileOrItems, sellerId, positionOrOnItemProgress, name, caption, onProgress){
    if (Array.isArray(imageFileOrItems)) {
        const items = imageFileOrItems;
        const onItemProgress = typeof positionOrOnItemProgress === "function"
            ? positionOrOnItemProgress
            : undefined;

        return Promise.all(
            items.map((item, index) =>
                uploadSingleSellerImage(
                    item.imageFile,
                    sellerId,
                    item.position,
                    item.name,
                    item.caption,
                    (progress) => onItemProgress?.(index, progress)
                )
            )
        );
    }

    return uploadSingleSellerImage(
        imageFileOrItems,
        sellerId,
        positionOrOnItemProgress,
        name,
        caption,
        onProgress
    );
}



export async function getSellerImage(sellerId){
    const {data, error} = await supabase
    .from("seller_images")
    .select("*")
    .eq("seller_id", sellerId)
    .order("position", {ascending: true});
    
    if(error){
        throw new Error(error.message);
    }

    return data;
};


export async function deleteSellerImage(sellerId, imageId){
    //get the image record
    const {data: imageData, error: fetchError} = await supabase
    .from("seller_images")
    .select("*")
    .eq("id", imageId)
    .eq("seller_id", sellerId)
    .select()
    .single();
    
    if(fetchError){
        throw new Error(fetchError.message);
    }

    //delete the image from storage
    const filePath = `seller-${sellerId}/${imageData.image_url.split("/").pop()}`;
    const {error: deleteStorageError} = await supabase.storage
        .from("seller-images")
        .remove([filePath]);

    if(deleteStorageError){
        throw new Error(deleteStorageError.message);
    }

    //delete the image record from database
    const {error: deleteDbError} = await supabase
    .from("seller_images")
    .delete()
    .eq("id", imageId);

    if(deleteDbError){
        throw new Error(deleteDbError.message);
    }
    
};




export async function uploadSellerAvatar(sellerId, avatar_url){
    //1. checking if it has an image path already
     const hasImagePath = avatar_url?.startsWith?.(supabaseUrl);

    //2. create an image name
     //choose a base for the image name: existing path, string name, file.name or fallback image.
 
    const imageBase = hasImagePath ? avatar_url
     : (typeof avatar_url === "string" 
         ? avatar_url : avatar_url?.name
         || "image");
     
    const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
     
     const filePath = `seller-${sellerId}/${imageName}`;
     
     //3. follows this pattern //https://mnojffbasafjsyamcbqw.supabase.co/storage/v1/object/public/seller-avatar/seller-123/team3.jpg
     const imagePath = hasImagePath ? avatar_url
     : `${supabaseUrl}/storage/v1/object/public/seller-avatar/${filePath}`;

     const {data: seller, error} = await supabase
     .from("sellers")
     .update({avatar_url: imagePath})
     .eq("id", sellerId)
     .select()
     .single();

    if(error){
        console.log(error);
        throw new Error(error || "Avatar could not be updated!");
    }

    //2. upload image
    //if cover has already a hosted url, skip upload and return db result.
    if(hasImagePath) return seller;

    const {error: storageError} = await supabase
    .storage
    .from("seller-avatar")
    .upload(filePath, avatar_url)

    if(storageError){
        console.log(storageError)
        throw new Error("Avatar image could not be uploaded!")
    }

    //get public url
    const {data: publicUrlData, error: publicUrlError} = supabase.storage
        .from("seller-avatar")
        .getPublicUrl(filePath);
    
    if(publicUrlError){
        throw new Error(publicUrlError.message);
    }

    const avatarUrl = publicUrlData.publicUrl;

    return avatarUrl;
 
};

export async function uploadSellerCoverImage(sellerId, coverImage_url){
    //1. checking if it has an image path already
     const hasImagePath = coverImage_url?.startsWith?.(supabaseUrl);

    //2. create an image name
     //choose a base for the image name: existing path, string name, file.name or fallback image.
 
    const imageBase = hasImagePath ? coverImage_url
     : (typeof coverImage_url === "string" 
         ? coverImage_url : coverImage_url?.name
         || "image");
     
    const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
     
     const filePath = `seller-${sellerId}/${imageName}`;
     
     //3. follows this pattern //https://mnojffbasafjsyamcbqw.supabase.co/storage/v1/object/public/seller-coverImage/seller-123/team3.jpg
     const imagePath = hasImagePath ? coverImage_url
     : `${supabaseUrl}/storage/v1/object/public/seller-coverImage/${filePath}`;

     const {data: seller, error} = await supabase
     .from("sellers")
     .update({coverImage_url: imagePath})
     .eq("id", sellerId)
     .select()
     .single();

    if(error){
        console.log(error);
        throw new Error(error || "Avatar could not be updated!");
    }

    //2. upload image
    //if cover has already a hosted url, skip upload and return db result.
    if(hasImagePath) return seller;

    const {error: storageError} = await supabase
    .storage
    .from("seller-coverImage")
    .upload(filePath, coverImage_url)

    if(storageError){
        console.log(storageError)
        throw new Error("Avatar image could not be uploaded!")
    }

    //get public url
    const {data: publicUrlData, error: publicUrlError} = supabase.storage
        .from("seller-coverImage")
        .getPublicUrl(filePath);
    
    if(publicUrlError){
        throw new Error(publicUrlError.message);
    }

    const avatarUrl = publicUrlData.publicUrl;

    return avatarUrl;
 
};











