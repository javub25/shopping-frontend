import { useEffect } from "react";
import ApiClient from '@http/ApiClient.jsx';

const API = import.meta.env.VITE_STRAPI_API_URL;
let FeedbackMsg;
const endpointStrapi = (productId) => `${API}/api/products/${productId}?fields=Comments`

const getFeedbackProduct = (endpoint) => {
    const {request, cancelRequest} = ApiClient(endpoint, {
        method: 'GET',
    })
    return { request, cancelRequest}
}

// Updating the product with the new feedback
const updateProductWithFeedback = async (response, endpoint, Feedback) =>
{
    try
    {
        const {Comments} = response.data.data.attributes;
        // Add the new feedback
        const newFeedback = {
            user: Feedback.user,
            feedbackDate: `${Feedback.date.getDate()}/${Feedback.date.getMonth() + 1}/${Feedback.date.getFullYear()}`,
            comment: Feedback.text
        };
        // Feedback list, containing old and new feedback.
        const feedbackProduct = {
            data: {Comments: [...Comments, newFeedback]}
        };
        // Update the existent product with the feedback updated
        ApiClient (endpoint, {
            method: "PUT",
            data: feedbackProduct
        })
    }
    catch(error)
    {
        console.error(error);
    }
}

const UpdateFeedbackIfExists = ({Feedback, productId}) => 
{
    FeedbackMsg = Feedback.text;
    const endpoint = endpointStrapi(productId);
    
    useEffect(() => 
    {
        const { request, cancelRequest } = getFeedbackProduct(endpoint);
        //If Product has some kind of feedback, we will update it
        request.then((res =>
        {
            if(res?.status === 200) 
                updateProductWithFeedback(res, endpoint, Feedback);
        }))
        .catch((error => {
            console.error(error);
        }))

        return () => {
            cancelRequest();
        }

    }, [FeedbackMsg])
}
//Get the current feedback message
const getFeedbackMsg = async () => await FeedbackMsg;

export { endpointStrapi, getFeedbackProduct, UpdateFeedbackIfExists, getFeedbackMsg};