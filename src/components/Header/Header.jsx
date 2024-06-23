import {useState, useContext} from "react";
import homeIcon from "@assets/icons/home.svg";
import hamburger from "@assets/icons/hamburger.svg";
import close from "@assets/icons/close.svg";
//Getting the initials avatar from a user
import { useLocation } from "wouter";
import { UserContext } from '@contexts/UserContext.jsx';
import { CartContext } from "@contexts/CartContext.jsx";
import { ProductContext } from "@contexts/ProductContext.jsx"
import categoriesList from "@services/GetCategories.jsx";
import bagShop from "@assets/icons/shopping-bag.svg";
import Avatar from "@components/User/Avatar.jsx";


const Header = ({onOpen}) => 
{
    const categories = categoriesList();
    const {user, setUser} = useContext(UserContext);
    const [showNavMob, setshowNav] = useState(false);
    const [cart] = useContext(CartContext);
    {/*We want to get every current page name to handle when is /products to hide or show categories tab*/}
    const [location] = useLocation();

    const [,,setProductsList] = useContext(ProductContext);
    
    
    const logoutUser = () => setUser({name: 'not logged in', email: 'not logged in'});

    //We get every time the current category is changed
    const showCategories = (category) => setProductsList(oldValue => ({...oldValue, categories: category}));

    if(categories?.length === 0) return null


    return (
        <header className="sticky top-0 z-30 bg-[#fffffff2] py-4 w-full">
            <nav>
                {/*Mobile*/}
                <div className="hidden mobile:block dropdown">
                        <label className="swap swap-rotate" >
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" onClick={() => setshowNav(oldValue => !oldValue)}/>
                            {/*hamburger icon*/}
                            <img src={hamburger} alt="Hamburger Icon" className="swap-off fill-[#00000]" />
                            {/* close icon */}
                            <img src={close} alt="Close Icon" className="swap-on fill-[#00000]"/>
                        </label>
                       
                        {showNavMob &&
                            <ul tabIndex={0} className="hidden mobile:block mt-3 p-2 rounded-box w-full">    
                                <li>
                                    <a href="/" style={{color: "black"}} title="Home"
                                        className="hover:decoration-black">
                                        <img src={homeIcon} alt="Home Icon" className="mx-auto"/>
                                    </a> 
                                </li>

                                <li className="pt-8 pb-2">
                                    <div className="relative mx-auto">
                                        {cart.length!==0 && 
                                            <span className="absolute bg-[#ff6f7b] text-white flex justify-center rounded-xl text-[10px] w-[1.1rem] h-[1.1rem] top-[-0.5rem] right-[40%] mx-auto">{cart.length}</span>
                                        }
                                        <img src={bagShop} alt="Shopping" onClick={() => onOpen(oldValue => !oldValue)} className="mx-auto"/>
                                    </div>
                                </li>

                                <li className="pt-8 pb-2">
                                    <a href="/products" style={{color: "black"}} title="products"
                                        className="hover:decoration-black">
                                        <h3 className="text-black font-normal text-base font-sans">Products</h3>
                                    </a> 
                                </li>

                                {/*We're only show categories tab when current page is /products*/}
                                {location === "/products" &&
                                    <li className="pt-4 pb-2">
                                        
                                        <details className="text-black font-sans">
                                            <summary>Categories</summary>
                                            <ul className="p-2 z-20">
                                                {categories!==undefined  && 
                                                    categories?.data.map((category) => 
                                                        <li key={category.id} className="cursor-pointer text-black font-bold py-4"
                                                                onClick={() => showCategories(category.attributes.Name)}>
                                                            {category.attributes.Name}
                                                        </li>
                                                    )                                     
                                                }
                                            </ul>
                                        </details>
                                    </li>
                                }
                                
                                 <li className="pt-4 pb-2">
                                    <a className="text-black text-base font-normal font-sans" href="/login" title="Login"
                                    style={{color: "black"}}>
                                        {/*Initial Avatar it will show when the user is logged in on Desktop*/}
                                        {user.email!=='not logged in' ?
                                            <Avatar user={user.name}/>  
                                        : "Login"}
                                    </a>
                                        {/*Show the logout only when the user is logged in.*/}
                                        {user.email!=='not logged in' && <h2 className="text-black text-base font-sans mt-2" onClick={logoutUser}>Logout</h2>}
                                </li>    
                            </ul>
                        }
                </div>
                {/*Desktop*/}
                <div className="mobile:hidden">
                    <ul tabIndex={0} className="mobile:hidden mx-auto z-20 px-1 flex flex-wrap justify-evenly items-center w-full">
                        <li>
                            <a href="/" style={{color: "black"}} title="Home" className="hover:decoration-black">
                                <img src={homeIcon} alt="Home Icon"/>
                            </a>
                        </li>
                        <li>
                            <a href="/products" style={{color: "black"}} title="products" className="hover:decoration-black">
                                <h3 className="text-black text-base font-normal font-sans">Products</h3>
                            </a> 
                        </li>
                        {/*We're only show categories tab when current page is /products*/}
                        {location === "/products" && 
                            <li>
                                <div className="relative w-full items-center mx-auto max-w-screen-sm">
                                    <div className="relative group/bouton w-full">
                                        <button className="py-3 pr-12 min-w-44 relative w-full">
                                            <h3 className="text-black text-base font-sans">Categories</h3>

                                            <span className="absolute flex items-center w-12 top-0 h-full right-[12%]">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="#000000" strokeLinecap="round" 
                                                    strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                        <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <ul className="z-20 absolute w-full bg-white top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all shadow-xl">
                                                {categories!==undefined && 
                                                        
                                                    categories?.data.map((category) => <li key={category.id} className="cursor-pointer text-black font-bold font-sans py-4" onClick={() => showCategories(category.attributes.Name)}>
                                                            {category.attributes.Name}
                                                        </li>
                                                    )                                     
                                                }
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        }

                        <li className="relative">
                            {cart.length!==0 && 
                                <span className="absolute bg-[#ff6f7b] text-white flex justify-center rounded-xl text-[10px] w-[1.1rem] h-[1.1rem] top-[-0.5rem] right-[-0.7rem]">{cart.length}</span>
                            }
                            <img src={bagShop} alt="Shopping" onClick={() => onOpen(oldValue => !oldValue)}/>
                        </li>
                        <li className="w-[90px] flex tablet:flex-col items-center justify-between">
                            <a className="w-[30px] text-black text-base font-normal font-sans" href="/login" title="Login"
                            style={{color: "black"}}>
                                {/*Initial Avatar it will show when the user is logged in on Desktop*/}
                                {/*<InitialsAvatar className="bg-[#ff5f6d] p-0.5 rounded-xl text-white" name={user.name} />*/} 
                                {user.email!=='not logged in' ?
                                    <Avatar user={user.name}/>  
                                    : 
                                "Login"}
                            </a>
                            {/*Show the logout only when the user is logged in.*/}
                            {user.email!=='not logged in' && <h2 className="text-black text-base font-sans" onClick={logoutUser}>Logout</h2>}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>    
    )
}
export default Header;