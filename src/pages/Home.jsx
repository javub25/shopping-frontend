import woman from "@assets/icons/woman.webp";
import { useContext } from "react";
import {CartContext} from "@contexts/CartContext.jsx";
import useCartStorage from "@hooks/useCartStorage.jsx";

const Home = () => {
    
    const [cart] = useContext(CartContext);
    useCartStorage(cart);

    return (
        <>
            <main className="my-8">
                <article
                    className="w-full mx-auto h-64 rounded-md overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${woman})`}}>
                        
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full relative">
                        <div className="px-4 max-w-xl absolute bottom-0">
                            <a href="/products" className="flex items-center mt-4 mb-[13px] px-3 py-2 bg-green-600 text-white text-sm font-normal rounded 
                            hover:bg-green-500 focus:outline-none focus:bg-green-500 hover:text-white font-sans">
                                Shop Now
                                <svg className="h-[2.5rem] w-[2.5rem] mx-2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </article>
            </main>            
        </>
    )
}
export default Home;