import {useContext, useEffect, useState} from 'react';
import { UserContext } from "@contexts/UserContext.jsx";
import ApiClient from '@http/ApiClient.jsx';

//We use GetProductsId to get the products of the user according to their ids
const GetProductsID = (API, productsId, setProducts) => 
{
    //Returns an array with filters string to get each product data from backend
    const query = productsId.map((id => `filters[id][$in]=${id}&`)).join('');
    const endpoint = `${API}/api/products?${query}populate=*`;

    const {request} = ApiClient(endpoint, {
        method: 'GET',
    })
    request.then(res => setProducts(res.data))
        .catch((error => console.error(error)))
} 

// We use GetProductsUser to know if the user has products
const GetProductsUser = ({children}) => {
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const {user, } = useContext(UserContext);
    const [products, setProducts] = useState(null);
    
    useEffect(() => {
        setProducts(null);

        if(user)
        {  
            const endpoint = `${API}/api/user-products?filters[email][$eq]=${user.email}&fields[0]=productsId`;
            const {request, cancelRequest} = ApiClient(endpoint, {
                method: 'GET',
            })
            request.then((res => {
                 //When user has products we get them
                 if(res?.data.data.length > 0)
                    {
                        const {productsId} = res.data.data[0].attributes;
                        GetProductsID(API, productsId, setProducts);
                    }   
            }))
            .catch((error) => console.error(error));

            

            return () => {      
                cancelRequest();          
            }
        }
    }, [user]);

   

    return products?.data.length > 0 ? children(products) : "";
}

export default GetProductsUser;