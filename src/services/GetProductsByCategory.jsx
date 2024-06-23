import {useEffect, useState} from 'react';
import ApiClient from '@http/ApiClient.jsx';

//We use GetProductsByCategory to get the products according to the category selected by the user
const GetProductsByCategory = (category) => 
{
    const [products, setProducts] = useState([]);
    const [Mounted, setMounted] = useState(false);
    const API = import.meta.env.VITE_STRAPI_API_URL;
     //Showing the products according to the category selected by the user.
    const endpoint = `${API}/api/products?filters[categories][Name][$eq]=${category}&populate=*`;

    useEffect(() => {
        setMounted(true);
        
            const {request, cancelRequest} = ApiClient(endpoint, {
                method: "GET",
            })
            request
                .then((res => setProducts(res?.data)))
                .catch((error) => {
                    setProducts(null);
                    console.error(error)
                })

        return () => 
        {
            setMounted(false);
            //Once hook is unmount we cancel axios request
            cancelRequest();
        }
    }, [Mounted])
    
    return products;
}
export default GetProductsByCategory;