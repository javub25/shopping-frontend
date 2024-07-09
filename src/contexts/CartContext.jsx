import {createContext, useState} from "react";

/*1) We're gonna create a cart context to sincronize changes products in our localStorage between 
SingleProduct.jsx and Cart.jsx*/
const CartContext = createContext();

/*2) We create a provider that will receives SingleProducts.jsx and Cart.jsx as children.
They will get access to latest cart data every time using cart variable globally*/ 
const CartProvider = ({children}) => 
{
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("productsCart")) || [])
    const newCart = [...cart];

    const addProduct = (product, cart, setCart) => {
        
        //We're looking for the current index of the existing product
        const index = cart.findIndex((productsCart => productsCart.id === product.id))
        
        //If product already exists we need to increase quantity and get the new price of product
        if(index!==-1) 
        {
            newCart[index].quantity+=1;
            newCart[index].totalPrice = newCart[index].basePrice * newCart[index].quantity;
        }
        //Otherwise we pass the initial product
        else {
            const {Name, Price, Image} = product.attributes

            newCart.push({
                id: product.id,
                image: `${Image?.data?.attributes?.url}`,
                name: Name,
                quantity: 1, 
                basePrice: Price,
                totalPrice: Price,
            }
            )
        }
        setCart(newCart)
    }

    /*it returns every object doesn't contain id parameter*/
    const removeProduct = (setCart, id) => setCart((oldProduct) => oldProduct.filter(item => item.id!==id))

    /*The `removeCart` function clears the contents of the cart by setting it to an empty array.*/
    const removeCart = (setCart) => setCart([])

    /*The removeQuantityCart will decrease quantity for each product*/
    const removeQuantityCart = (index, setCart) =>{
        newCart[index].quantity = newCart[index].quantity <= 1 ? 1 : newCart[index].quantity - 1;
        newCart[index].totalPrice = newCart[index].quantity <=1 ? newCart[index].basePrice : newCart[index].totalPrice - newCart[index].basePrice;
        setCart(newCart);
    }
    
    return (
        <CartContext.Provider value={
            [cart, 
            setCart, 
            addProduct, 
            removeProduct, 
            removeCart,
            removeQuantityCart
            ]}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider};
