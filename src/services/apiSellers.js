import supabase, { supabaseUrl } from "./supabase";


export async function createSellerProfile(form){
    const {data: seller, error} = await supabase
    .from("sellers")
    .insert({form})
    .select();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return seller;
};


//public seller profile: buyer flow
export async function getSellerByUsername(username){
    const {data: seller, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("username", username)
    .single();
    
    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return seller;
}; 

//private seller profile: seller flow
export async function getSellerById(id){
    const { data:seller, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", id)
    .single();

    if(error){
        console.log(error.message);
        throw new Error(error);
    }

    
    return seller;
}; 



export async function getAllActiveSellers(){
    const {data: sellers, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("is_active", true);
    
    if(error){
        console.log(error);
        throw new Error(error);
    }
    
    return sellers;
};

export async function getSellersByCategory(categoryId){
    const {data: sellers, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true);
    
    if(error){
        console.log(error);
        throw new Error(error);
    }
    
    return sellers;
};



export async function updateSellerProfile(sellerId, profileData){
    
    const {data: seller, error} = await supabase
    .from("sellers")
    .update(profileData)
    .eq("id", sellerId)
    .select()
    .single();

    if(error){
        console.log(error);
        throw new Error(error || "Profile could not be updated!");
    }    

    return seller;
};


export async function updateUserMetadata(updates){
    const {data, error} = await supabase.auth.updateUser({
        data: updates
    });

    if(error){
        console.log(error);
        throw new Error(error.message || "User metadata could not be updated!");
    }

    return data;
};


export async function searchSellersByName(query){
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .ilike("business_name", `%${query}%`)
    .eq("is_active", true)

  if (error){
    throw new Error(error.message || "Error searching sellers by name");
  }

  return data
};




