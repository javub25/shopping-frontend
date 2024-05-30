import axios from 'axios';
import {useEffect, useState} from 'react';
//We use GetProductsByCategory to get the products according to the category selected by the user
const GetProductsByCategory = (category) => 
{
    const [products, setProducts] = useState([]);
    const [Mounted, setMounted] = useState(false);

    const API = import.meta.env.VITE_STRAPI_API_URL;

    useEffect(() => {
        setMounted(true);
            //object controller to abort our axios request once component is unmount
            const controller = new AbortController();
            //Showing the products according to the category selected by the user.
            axios.get(`${API}/api/products?filters[categories][Name][$eq]=${category}&populate=*`, {
                signal: controller.signal 
            })
            .then((res => {
                setProducts(res.data);
            }))
            .catch((error) => {
                setProducts(null);

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
    
    return products;
}
export default GetProductsByCategory;