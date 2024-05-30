import {useState, createContext} from "react";
import getProducts from "@services/GetProductsByCategory.jsx";
const ProductContext = createContext();

const ProductProvider = ({children}) => 
{    
    //State to handle filter price and categories
     const [productsList, setProductsList] = useState(
    {
        filterMaxPrice: 1000,
        categories: "All",
    })
    //We get products according to the category selected
    const products = getProducts(productsList.categories);

    if(products?.length === 0) return null;
    
    //It will render products according price and categories
    const filterProducts = 
        products?.data.filter((product => {
            const {Price, categories} = product.attributes;
                return ((Price < productsList.filterMaxPrice)
                && (productsList.categories === "All" || productsList.categories === categories?.data[1].attributes.Name)) 
            }
        ))
    
    return (
        <ProductContext.Provider 
            value={[filterProducts, productsList, setProductsList]}>
            {children}
        </ProductContext.Provider>
    )
}
export {ProductContext, ProductProvider};