import { useEffect } from "react";
import { endpointStrapi, getFeedbackProduct, getFeedbackMsg } from "@services/ProductFeedback_service.jsx";

const useStoreFeedback = (modifyFeedback, productId) => 
{
    const endpoint = endpointStrapi(productId);
    const FeedbackMsg = getFeedbackMsg();
    //It needs to run whenever Feedback message changes or when the product changes
    useEffect(() => 
    {
        const { request, cancelRequest } = getFeedbackProduct(endpoint);
            request.then((res => {
                if(res?.status === 200)
                {
                    const {Comments} = res.data.data.attributes;
                    modifyFeedback(Comments);
                }
            }))
            .catch((error => console.error(error)));
            
            return () => {
                cancelRequest();
            }
    }, [productId, FeedbackMsg])
}
export default useStoreFeedback;