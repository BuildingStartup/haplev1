import { useCallback, useState } from "react";
import { getAllActiveSellers, getSellerById, getSellerByUsername } from "../../services/apiSellers";

function useSeller(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seller, setSeller] = useState(null);
    const [sellers, setSellers] = useState([]);

    const fetchSellerById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try{
            const data = await getSellerById(id);
            setSeller(data);
        } catch(err){
            console.log(err)
            setError(err.message);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSellerByUsername = useCallback(async (username) => {
        setLoading(true);
        setError(null);
        try{
            const data = await getSellerByUsername(username);
            setSeller(data);
        }
        catch(err){
            console.log(err)
            setError(err.message);
            throw new Error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const fetchAllSellers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const data = await getAllActiveSellers();
            setSellers(data);
        }
        catch(err){
            console.log(err)
            setError(err.message);
            throw new Error(err);
        }
        finally {
            setLoading(false);
        }
        
    }, []);
    
    return {loading, error, seller, fetchSellerById, fetchSellerByUsername, sellers, fetchAllSellers};
}



export default useSeller;
