import { useEffect, useState } from 'react';
import ApiClient from '@http/ApiClient.jsx';

//We use GetCategories to get all the categories from backend
const GetCategories = () => 
{
    const [categories, setCategories] = useState([]);
    const [Mounted, setMounted] = useState(false);

    const API = import.meta.env.VITE_STRAPI_API_URL;
    const endpoint = `${API}/api/categories`;
    
    useEffect(() => {
        setMounted(true);

        const {request, cancelRequest} = ApiClient(endpoint, {
            method: 'GET',
        })
        request
            .then((res => setCategories(res?.data)))
            .catch((error => 
            {
                setCategories(null)
                    console.error(error); 
                }
            ))

        return () => 
        {
            setMounted(false);
            //Once hook is unmount we cancel axios request
            cancelRequest();
        }
    }, [Mounted])
    
    return categories;
}
export default GetCategories;