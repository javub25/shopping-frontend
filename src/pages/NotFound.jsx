import {useContext} from "react";
import NotFoundImg from "@assets/icons/NotFoundImg.svg";
import {CartContext} from "@contexts/CartContext.jsx";
import useCartStorage from "@hooks/useCartStorage.jsx";

const NotFound = () => 
{
    const [cart] = useContext(CartContext);
    useCartStorage(cart);

    return(
        <div className="py-16 flex items-center tablet:flex-col-reverse mobile:flex-col-reverse">
            <div className="w-full lg:w-1/2 mx-8">
                <div className="text-7xl text-green-500 font-semibold font-extrabold mb-8">404</div>
                    <p className="text-2xl md:text-3xl font-normal leading-normal mb-8 font-sans">
                        Sorry we couldn&apos;t find the page you&apos;re looking for
                    </p>
                    <a href="/" className="px-5 py-3 text-sm font-medium leading-5 shadow-lg text-white 
                        transition-all duration-400 border border-transparent rounded-lg 
                        focus:outline-none bg-green-600 
                        active:bg-green-500 hover:bg-green-500 hover:text-white font-sans">
                            Back to Homepage
                    </a>
                </div>
                <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                    <img src={NotFoundImg} className="w-96 mx-auto" alt="Page not found"/>
                </div>
        </div>
    )
}
export default NotFound;