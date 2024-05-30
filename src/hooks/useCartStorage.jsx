import {useEffect} from "react";

//A custom hook that saves the cart data to the local storage whenever it changes
const useCartStorage = (cart) => 
{
    useEffect(() => 
    {
        localStorage.setItem("productsCart", JSON.stringify(cart));
        return () => {}
    }, [cart]);
}
export default useCartStorage;