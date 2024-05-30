import { useContext } from "react";
import close from "@assets/icons/close.svg";
import {CartContext} from "@contexts/CartContext.jsx";
import {UserContext} from "@contexts/UserContext.jsx";
import useToastContainer from '@hooks/useToastContainer.jsx';
import PostProductsUser from "@services/PostProductsUser.jsx";

const Cart = ({ isOpen, onClose }) => {
    
    const [cart, setCart, addProduct, removeProduct, removeCart, removeQuantityCart] = useContext(CartContext);
    const {user, } = useContext(UserContext);
    let TotalPrice = 0;

    const { showSuccessToast, showErrorToast } = useToastContainer();

    const ModalClose = () => onClose(oldValue => !oldValue);

    const BuyItems = () => 
    {
        /*if user is logged in to the application, it be able to buy their products*/
        if(user.email!=="not logged in") {
            PostProductsUser(user, cart, setCart, removeCart, showSuccessToast); 
        } 
        //If user is not logged in, we will give an message to indicate 
        else showErrorToast("Payment declined, you need to login! 🤯");
    }
    
    return (
        <>        
          <div className={`drawer lg:drawer-open z-40 ${isOpen ? 'open' : 'close'}`} >
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" defaultChecked={isOpen} onClick={ModalClose} />
                <div className="mobile:bg-white drawer-side h-full">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    <div className={`p-8 w-[30rem] bg-white h-full mobile:w-full text-base-content ${isOpen ? 'open' : 'close'}`} style={{ overflowY: 'auto' }}>
                        <header className="flex justify-between items-center pb-12">
                            <h1 className="text-lg font-bold font-sans">My Cart</h1>
                                <button onClick={ModalClose}>
                                    <img src={close} alt="Close Modal" className="h-6 w-6 cursor-pointer m-auto"/>
                                </button>
                        </header>

                        <section>
                             {/*We display the phrase "your cart is empty" if there are no products in the cart.*/}
                             {cart.length === 0 ?
                                        <>  
                                            <h2 className="text-[#213547] text-lg pb-[40px] text-center font-sans">Your cart is empty.</h2>
                                            <a href="/products" className="text-center rounded-md p-4 bg-[#ffc371] text-[#213547] 
                                            hover:bg-[#ffcf8d] hover:text-[#213547] mb-[40px] w-[120px] mx-auto font-sans">
                                                Buy Now!
                                            </a> 
                                        </>
                                        : 
                                        <>
                                            {/*We display the products in the cart*/}
                                            {cart.map((product, i)=> 
                                            {
                                                TotalPrice+=product.totalPrice;
                                                return (
                                                    <ul>
                                                        <li className="flex mobile:flex-col py-6 items-center mobile:items-start">
                                                            <div className="mobile:mx-auto p-4 overflow-hidden rounded-md border border-gray-200 relative">
                                                                <img src={product.image} alt={product.image} className="w-[55px] mx-auto"/>
                                                                <div className="top-0 right-0 absolute h-[20px] w-[20px] rounded-full bg-[#ffc371] transition-all duration-200"
                                                                    onClick={() => removeProduct(setCart, product.id)}>
                                                                        <img src={close} alt="Delete product" className=" h-4 w-[12px] m-auto"/>
                                                                </div>
                                                            </div>

                                                            <div className="ml-4 mobile:pt-4">
                                                                <h3 className="text-gray-900 text-balance text-left text-base font-normal font-sans">
                                                                    {product.name}
                                                                </h3>

                                                                <div className="pt-2 flex flex-1 items-center justify-between w-[150px] text-sm">
                                                                    <button className="p-2 bg-[#ffc371] rounded-md" onClick={() => removeQuantityCart(i, setCart)}>
                                                                        <svg stroke="#213547" fill="#213547" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="11px" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                                                                    </button>
                                                                    <p className="text-gray-900 font-sans">{product.quantity}</p>
                                                                    <button className="p-2 bg-[#ffc371] rounded-md" onClick={() => addProduct(product, cart, setCart)}>
                                                                        <svg stroke="#213547" fill="#213547" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="11px" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                                                                    </button>

                                                                    <h3 className="text-gray-900 text-balance text-left text-base font-sans">
                                                                        {parseFloat(product.totalPrice.toFixed(2))} €
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        {/*Every product will has horizontal line except the last one*/}
                                                        {i!==cart.length - 1 && 
                                                            <li>
                                                                <hr className="text-[#213547]"></hr>
                                                            </li>
                                                        }
                                                    </ul>
                                                )
                                            })}

                                            <button className="text-sm text-center rounded-md p-[14px] bg-[#ffc371] text-[#213547] 
                                            hover:bg-[#ffcf8d] hover:text-[#213547] w-[190px] mx-auto font-medium font-sans" 
                                            onClick={() => removeCart(setCart)}>Remove Cart</button>

                                            <div className="mb-[30px] flex items-center justify-between border-b border-neutral-200 pb-1 pt-[2rem] dark:border-neutral-700">
                                                <p className="text-gray-900 font-sans">Total</p>
                                                {/*It will returns 2 decimals*/}
                                                    <p className="text-gray-900 text-right text-base font-sans">{parseFloat(TotalPrice.toFixed(2))} €</p>
                                            </div>

                                            <button onClick={BuyItems} className="mx-auto block w-[230px] rounded-md bg-[#ffc371] text-[#213547] hover:text-black hover:bg-[#ffcf8d] p-3 text-center text-sm font-medium font-sans">
                                                Proceed to Checkout
                                            </button>
                                        </>
                                    }
                        </section>
                            
                           
                    </div>
                </div>
            </div>
          
          
        </>
    );
}

export default Cart;