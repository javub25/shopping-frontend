import axios from 'axios';
import {useEffect, useState} from 'react';
//We use GetCategories to get all the categories from backend
const GetCategories = () => 
{
    const [categories, setCategories] = useState([]);
    const [Mounted, setMounted] = useState(false);

    const API = import.meta.env.VITE_STRAPI_API_URL;
    
    useEffect(() => {
        setMounted(true);
        //object controller to abort our axios request once component is unmount
        const controller = new AbortController();
            //Showing all categories from STRAPI
            axios.get(`${API}/api/categories`, {
                signal: controller.signal // Pass the cancel token to the request config
            })
            .then((res => {
                setCategories(res.data);
            }))
            .catch((error) => {                
                setCategories(null)
                
                if(!axios.isCancel(error))
                    console.error(error); 
            })
        return () => 
        {
            setMounted(false);
            //Once hook is unmount we cancel axios request
            controller.abort();
        }
    }, [Mounted])
    
    return categories;
}
export default GetCategories;