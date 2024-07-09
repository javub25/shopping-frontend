import { useState, useContext, useRef, lazy, Suspense} from "react";
import shoppingCart from "@assets/icons/shopping-cart.svg";
import {UserContext} from '@contexts/UserContext';
import {CartContext} from '@contexts/CartContext';
import useCartStorage from '@hooks/useCartStorage.jsx';
import signIn from "@services/SignIn.jsx";
import registration from '@services/SignUp.jsx';
import { CheckName, CheckEmail, CheckPassword } from "@utilities/FormValidator.jsx";

 //We show GetProductsUser once the user is logged in
const LazyGetProductsUser = lazy(() => import('@services/GetProductsUser.jsx'));

const Login = () => {
    const ControllerRef = useRef(null);
    //State that will manage Form fields
    const [FormStatus, setFormStatus] = useState({signUp: true, name: true, email: true, password: true});
    const {user, setUser} = useContext(UserContext);
    const [cart] = useContext(CartContext);
    useCartStorage(cart);

    
    //It will change the form to sign up or login
    const setSignUp = () => setFormStatus(oldValue => ({...oldValue, signUp: !oldValue.signUp}))

    /*It will collect the data from the form and send it to the API.
    Calling registration if user is signing up or login if user is logging in.
    */
    const SendData = (e) => 
    {
        e.preventDefault();
        const Data = new FormData(document.querySelector("#Form"));

        setFormStatus(oldValue => 
            ({...oldValue,
                name: CheckName(Data.get("Name")), 
                email: CheckEmail(Data.get("Email")),
                password: CheckPassword(Data.get("Password"))
            })
        )
        FormStatus.signUp ? registration(Data, setFormStatus, CheckEmail, ControllerRef): signIn(Data, setUser, ControllerRef);
    }


    return (
        <>
            <main className="flex py-16 items-center justify-center">
                    {user.email!=="not logged in" ? (
                        <section>
                            <h1 className="text-3xl font-semibold text-black font-sans">Welcome back {user.name}! 👋</h1>
                            <div className="mt-16 flex mobile:flex-col gap-6 items-center justify-center">
                                <img src={shoppingCart} alt="Shopping Cart"/>
                                    <h2 className="text-xl text-black font-sans">Your Recent Purchases</h2>
                            </div>
                            <Suspense fallback="Loading products">
                                <LazyGetProductsUser>
                                    {(products) => {
                                        return(  
                                            <>
                                                {products.data.length > 0  &&
                                                        <> 
                                                            <div className="mt-16 flex items-center justify-center flex-wrap gap-8">
                                                                                                                                                                                                                 
                                                                {products.data.map((item => {
                                                                    const {Name, Image} = item.attributes;
                                        
                                                                        return (
                                                                            <div className="w-64 h-64 mx-auto">
                                                                                    <img src={`${Image.data.attributes.url}`} 
                                                                                        alt={Name} className="w-24 h-32 mx-auto"/>
                                                                                    <h3 className="text-center p-8 text-black font-sans">{Name}</h3>
                                                                            </div>
                                                                        ) 
                                                                }
                                                                ))}
                                                            </div>                                                 
                                                        </>
                                                }
                                            </>
                                        )
                                    }}
                                </LazyGetProductsUser>
                            </Suspense>
                        </section>

                    ):(
                        <section className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">

                            <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                {FormStatus.signUp ? "Sign Up" : "Sign In"}
                            </h4>
                            {/*When the user registers, the message Enter your details to register will be displayed, otherwise nothing will be displayed.*/}
                            {FormStatus.signUp ? <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">Enter your details to register.</p> : ""}

                                <form id="Form" className="mt-8 mb-2 w-80 max-w-screen-lg mobile:w-full" onSubmit={(e) => SendData(e)} method="POST" noValidate>
                                    <div className="mb-4 flex flex-col gap-6">
                                        {FormStatus.signUp &&
                                            <div className={`${!FormStatus.name ? 'mb-[2rem]' : ""} relative h-11 w-full min-w-[200px]`}>
                                                <input
                                                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder="" name="Name"/>
                                            
                                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                    Name
                                                </label>
                                                {!FormStatus.name ?
                                                    <div className="mt-[13px] text-left">
                                                        <span className="text-red-500">Invalid Name</span>
                                                    </div> 
                                                : ""
                                                }
                                            </div>
                                        }
                                        
                                        <div className={`${!FormStatus.email ? 'mb-[2rem]' : ""} relative h-11 w-full min-w-[200px]`}>
                                            <input
                                                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=""
                                                type="email"
                                                name="Email"
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Email
                                            </label>
                                            {!FormStatus.email ?
                                                <div className="mt-[13px] text-left">
                                                    <span className="text-red-500">Invalid Email</span>
                                                </div> 
                                            : ""
                                            }
                                    </div>
                                        <div className={`${!FormStatus.password ? 'mb-[5rem]' : ""} relative h-11 w-full min-w-[200px]`}>
                                            <input
                                            type="password"

                                            className='peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                            placeholder=""
                                            name="Password"
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Password
                                            </label>
                                            {!FormStatus.password ?
                                                <div className="mt-[13px] text-left">
                                                    <span className="text-red-500">Invalid Password: Your password must be more than 8 characters</span>
                                                </div> 
                                            : ""
                                            }
                                        </div>
                                    </div>

                                    <button
                                        className="bg-[#ff6f7b] mt-6 block w-full select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true">
                                        {FormStatus.signUp ? "Sign Up": "Sign In"}
                                    </button>

                                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                        Already have an account?
                                        <span className="ml-[10px] font-semibold text-[#ff6f7b]" onClick={setSignUp}>
                                            {FormStatus.signUp ? "Sign In" : "Sign Up"}
                                        </span>
                                    </p>
                                </form>
                        </section>
                    )}
            </main>
        </>  
    )
}
export default Login;