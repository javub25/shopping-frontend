import { useContext } from 'react';
//We're gonna get access to state property from wouter
import { useHistoryState } from "wouter/use-browser-location";

import Related from "@components/Products/Related.jsx";
import Feedback from "@components/Products/Feedback/Feedback.jsx";
import ShowFeedback from "@components/Products/Feedback/ShowFeedback.jsx";

import {CartContext} from "@contexts/CartContext.jsx";
import { ProductContext } from '@contexts/ProductContext.jsx';
import { UserContext } from "@contexts/UserContext.jsx";

import useCartStorage from "@hooks/useCartStorage.jsx";
import NotFound from "@pages/NotFound.jsx";


const SingleProduct = () => 
{
   /* The code is using the `useHistoryState` hook from the `wouter/use-browser-location` library to
   access the state property. */
    const state = useHistoryState();
    const product = state === null ? "NotFound" : state.productData;
    const {user, } = useContext(UserContext);

    //We use cart context to addProduct to Cart and syncronize data between them.
    const [cart, setCart, addProduct] = useContext(CartContext);
    //We use the products resulting from the context to look for products that match the category of the selected product.
    const [filterProducts, ] = useContext(ProductContext);
    useCartStorage(cart);
        
    /*Using destructuring to extract specific properties from the `product.attributes`.
    In case product variable returns nothing, we return an empty object
    */
    const {Name, Description, Price, categories, Image} = product.attributes || {};

    const API = import.meta.env.VITE_STRAPI_API_URL;

    return (
        <>
            <main>
                <section>
                    {product === "NotFound" ? (
                        <NotFound />
                    ):(
                        <>
                            <article className="grid grid-cols-2 tablet:grid-cols-1 mobile:grid-cols-1 pt-16 place-content-center">
                                <div>
                                    <img src={`${Image?.data?.attributes?.url}`} className="w-40 mx-auto tablet:pt-[30px] mobile:w-[124px] mb-4" />
                                    <div className="my-4 bg-black text-white badge p-4 badge-outline font-sans">{categories.data[1].attributes.Name}</div> 
                                </div>
                                <div>
                                    <h1 className="text-black text-2xl text-left font-bold tablet:mt-8 mobile:mt-4 font-sans">{Name}</h1>
                                    <p className="text-black mt-[10px] text-base text-balance break-words text-left font-sans">
                                        {Description}
                                    </p>

                                    <div className="text-left py-4">
                                        <div className="inline-block align-bottom mr-8">
                                            <p className="text-black mt-[10px] text-[23px] font-bold text-left font-sans">
                                                {Price} €
                                            </p>
                                        </div>
                                        <div className="inline-block align-bottom">
                                            <button className="rounded-full mx-5 mt-[12px] mx-auto p-3 bg-[#ffc371] text-black hover:bg-[#ffcf8d]"
                                                onClick={() => addProduct(product, cart, setCart)}>
                                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="py-20">
                                <Feedback productId={product.id} user = {user.name}/>
                            </article>
                            <article>
                                <ShowFeedback productId={product.id}/>
                            </article>

                            <article>
                                <Related 
                                    excludedProductID = {product.id}
                                    category = {categories.data[1].attributes.Name}
                                    products = {filterProducts}
                                />
                            </article>

                            <footer className="pt-[50px]">
                                <a href="/products" title="Go to products" className="w-[30px] block hover:text-[#ff5f6d]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" 
                                        viewBox="0 0 20 20" fill="#00000">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" 
                                        clipRule="evenodd" 
                                        ></path>
                                    </svg>
                                </a>
                            </footer>
                        </>
                    ) 
                    }
                </section>
            </main>        
        </>
    );
}

export default SingleProduct;