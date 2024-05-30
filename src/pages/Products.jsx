import {Link} from "wouter";
import { useContext } from "react";
import { ProductContext } from "@contexts/ProductContext.jsx";
import {CartContext} from "@contexts/CartContext.jsx";
import useCartStorage from "@hooks/useCartStorage.jsx";


const Products = () => 
{
    const [filterProducts, productsList, setProductsList] = useContext(ProductContext);
    const changePrice = (e) => setProductsList(oldValue => ({...oldValue, filterMaxPrice: e.target.value}))
    const API = import.meta.env.VITE_STRAPI_API_URL;

    const [cart] = useContext(CartContext);
    useCartStorage(cart);

    return (
        <main>
            <header className="py-16">
                <h1 className="text-black text-center text-[23px] font-semibold font-sans">Products</h1>
            </header>
            
            <section>

                <article className="flex flex-wrap justify-evenly items-center">
                    <div className="tablet:pb-8 mobile:pb-8">
                        <span className="align-text-bottom text-black">11€&nbsp;</span>
                            <input type="range" 
                                min="11" max="1000" 
                                 onChange={changePrice}
                                 value={productsList.filterMaxPrice}
                                className="range range-error mr-2 w-auto" 
                            />
                        <span className="align-text-bottom text-black">1000€</span>
                        <br/>                    
                        <span id="currentPrice" className="m-0 align-text-bottom text-black">{productsList.filterMaxPrice}€</span>
                    </div>
                </article>

                { 
                    filterProducts?.length === 0 || filterProducts === undefined ? (
                        <article className="py-32">
                            <p className="text-black font-light text-2xl md:text-3xl leading-normal mb-8 font-sans">
                                No products found.
                            </p>
                        </article>
                    )
                    :
                    (
                        <>
                            <article className="pt-[6rem] grid grid-cols-3 tablet:grid-cols-2 gap-x-[2rem] gap-y-[4rem] mobile:grid-cols-1">
                            {
                                filterProducts?.map((product) => 
                                    {
                                        //I make a destructuring array to get the values of Name, price and categories from product.attributes
                                        const {Name, Price, categories, Image} = product.attributes;


                                        return (
                                            <div key={product.id} className="card w-full">
                                               <Link href="/product" state={{productData: product}}>
                                                    <img width="120" src={`${API}${Image?.data?.attributes?.url}`} className="h-[180px] mobile:h-[124px] mb-8 mx-auto object-contain" alt={Name}/>
                                                </Link>
                                               
                                                <div className="card-body pt-0 gap-y-12 relative">
                                                    <h2 className="pb-[3.3rem] justify-center card-title text-base font-normal text-black font-sans">
                                                        {Name}
                                                    </h2>
                                                
                                                     
                                                    <div className="card-actions justify-center absolute bottom-0 left-0 right-0">
                                                        <div className="bg-black text-white badge p-4 badge-outline font-sans">{categories.data[1].attributes.Name}</div>
                                                        <div className="bg-black text-white badge p-4 badge-outline font-sans">{Price} €</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                            </article>
                        </>
                    )
                }
            </section>
        </main>
    )
}
export default Products;