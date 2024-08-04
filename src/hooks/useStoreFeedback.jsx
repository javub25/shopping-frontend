import { useEffect, useRef } from "react";
import { endpointStrapi, getFeedbackProduct} from "@services/ProductFeedback_service.jsx";

const useStoreFeedback = (FeedbackData, setFeedback, productId) => 
{
    const endpoint = endpointStrapi(productId);
    const cancelReqRef = useRef(null);

    //It needs to run whenever Feedback message changes or when the product changes
    useEffect(() => 
    { 
        const timer = setTimeout(() => 
        {
            const { request, cancelRequest } = getFeedbackProduct(endpoint);
            cancelReqRef.current = cancelRequest;

            request.then((res => {
                if(res?.status === 200)
                {
                    const {Comments} = res.data.data.attributes;
                    setFeedback(Comments);    
                }
            }))
            .catch((error => console.error(error)))
        }, 500)       

        return () => {
            clearTimeout(timer);
            
            if(cancelReqRef.current)
            {
                cancelReqRef.current();
            }
        }
    }, [productId, FeedbackData.added])
}
export default useStoreFeedback;