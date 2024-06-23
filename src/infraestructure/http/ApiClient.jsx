import axios from 'axios';
import createAbortController from '@http/AbortController.jsx';

//Function that handles errors centrally for each request
//endpoint receives the axios url
//options receives the axios config (headers, (post, get, put, delete methods...))
const ApiClient = (endpoint, options) =>
{
    //Empty object in case no options are passed
    options = options || {};
    const {signal} = options;

    //object controller to abort our axios request once component is unmount
    const controller = createAbortController();

    const configRequest = {
        ...options,
            signal: signal || controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
          },
    }
    
    //Custom axios request based on endpoint and configRequest passed as parameters (GET, POST, PUT...)
    const request = axios(endpoint, configRequest)
        .then((res) => res)
        .catch((error) => {
            if(axios.isCancel(error))
                console.error("Request Cancelled");
            else console.error(error)     
        })
    
    //Allows you to cancel requests for axios from any part of the application.
    const cancelRequest = () => controller.abort();
    
    return {controller, request, cancelRequest};
}
export default ApiClient;