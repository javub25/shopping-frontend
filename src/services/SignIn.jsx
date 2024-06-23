
import useToastContainer from '@hooks/useToastContainer.jsx';
import ApiClient from '@http/ApiClient.jsx';
import createAbortController from '@http/AbortController.jsx';

const SignIn = (Data, setUser, controllerRef) => 
{
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const { showSuccessToast, showErrorToast } = useToastContainer();

    const user = {identifier: Data.get("Email"), password: Data.get("Password")};
    const endpoint = `${API}/api/auth/local`;

       
    //We check if email and password are enter correctly and then we log in
    if(user.identifier && user.password)
    { 
        //If there is more than request in progress, they are gonna cancel
        if(controllerRef.current) 
            controllerRef.current.abort();
        
        //Update the reference
        controllerRef.current = createAbortController();

        //We send the email and password to Strapi 
        const { request } = ApiClient(endpoint, {
            method: 'POST',
            data: user,
            signal: controllerRef.current.signal
        });
        

        request.then((res => 
            {
                if(res.status === 200)
                {
                    showSuccessToast("Sucessfull logged in! 👌");
                    setUser({name: res.data.user.username, email: res.data.user.email});                    
                }
            }
        ))
        .catch((error) => 
        {
            if(error.code === "ERR_NETWORK") showErrorToast("No internet connection! 🤯")
            else showErrorToast("User doesn't exist! 🤯")
        
            throw new Error(error);
        })
    }
}



export default SignIn;