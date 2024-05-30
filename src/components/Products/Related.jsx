import {useState} from "react";
import {Link} from "wouter";

const Related = (props) => 
{
    /*Display only the products that match the current category, excluding from the list the product that is already being displayed.*/
    const related = props.products?.filter(product => product.id!==props.excludedProductID && product.attributes.categories.data[1].attributes.Name === props.category);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevious = () => setCurrentSlide((prevSlide) => (prevSlide === 0 ? related?.length - 1 : prevSlide - 1));
    const handleNext = () => setCurrentSlide((prevSlide) => (prevSlide === related?.length - 1 ? 0 : prevSlide + 1));

    const API = import.meta.env.VITE_STRAPI_API_URL;

    return (
        <>
        {related?.length!==0 &&
            <>
                <h1 className="text-black text-xl text-center my-12 font-sans"><b>Products Related to this product</b></h1>

                <div className="min-h-[210px] p-3 relative">
                    <div className="w-[160px] mobile:w-[140px] mx-auto">
                        {
                            related?.map((product, index) => {
                                {/*Using destructuring to extract Image property from the `product.attributes`*/}
                                const {Image} = product.attributes
    
                                return <div key={product.id} className={`w-[160px] mobile:w-[140px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 
                                        ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                                            <Link href="/product" state={{productData: product}}>
                                                <img className="w-full" src={`${API}${Image?.data?.attributes?.url}`} alt={product.attributes.Name}/>
                                            </Link>
                                                
                                        {/*The previous and next arrows will appear when there is more than one related product.*/}
                                        {related.length > 1 && 
                                            <div className="absolute top-1/2 w-full flex justify-between z-20">
                                                <label onClick={handlePrevious} 
                                                    className="ml-[-40%] inline-block text-black hover:text-[#ff5f6d] cursor-pointer translate-x-5 bg-white rounded-full active:translate-y-0.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd"></path>
                                                    </svg>
                                                </label>
                                                <label onClick={handleNext} 
                                                    className="mr-[-19%] inline-block text-black hover:text-[#ff5f6d] cursor-pointer translate-x-5 bg-white rounded-full active:translate-y-0.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </label>
                                            </div>
                                        }
                                    </div>
                                
                            })
                        }               
                    </div>
                </div>
            </>
        }
    </>
    )
}
export default Related;