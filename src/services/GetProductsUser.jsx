import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from "@contexts/UserContext.jsx";

//We use GetProducts to get the products of the user according to their ids
const GetProducts = (productsId, setProducts) => 
{
    const API = import.meta.env.VITE_STRAPI_API_URL;
    //Returns an array with filters string to get each product data from backend
    const query = productsId.map((id => `filters[id][$in]=${id}&`)).join('');

    axios.get(`${API}/api/products?${query}populate=*`)
        .then((res) => setProducts(res.data))
        .catch((error) => {
            console.error(error);
        });        
} 
// We use GetProductsUser to know if the user has products
const GetProductsUser = () => {
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const {user, } = useContext(UserContext);
    const [products, setProducts] = useState(null);
        
    useEffect(() => {
        //object controller to abort our axios request once component is unmount
        const controller = new AbortController();
        setProducts(null);

        if(user)
        {
            axios.get(`${API}/api/user-products?filters[email][$eq]=${user.email}&fields[0]=productsId`, {signal: controller.token})
            .then((res) => 
            {
                //When user has products we get them
                if(res.data.data.length > 0)
                {
                    const {productsId} = res.data.data[0].attributes;
                    GetProducts(productsId, setProducts);
                }
            })  
            .catch((error) => console.error(error));
    
            return () => controller.abort();
        }
    }, [user]);

    return products;
}


export default GetProductsUser;