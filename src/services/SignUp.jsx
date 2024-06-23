import useToastContainer from '@hooks/useToastContainer.jsx';
import ApiClient from '@http/ApiClient.jsx';
import createAbortController from '@http/AbortController.jsx';


const SignUp = (Data, setFormStatus, EmailValidator, controllerRef) => 
  {
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const { showSuccessToast, showErrorToast } = useToastContainer();

    //User object will send to Strapi with the respective data from the form
    const NewUser = {username: Data.get("Name"), email: Data.get("Email"), password: Data.get("Password")};

    //We get a boolean that will verify if email format is valid or not
    const emailStatus = EmailValidator(NewUser.email);

    const endpoint = `${API}/api/auth/local/register`;
    
    //Email must to be valid to register a new user to Strapi
    if(emailStatus && NewUser.password)
    {
         //If there is more than request in progress, they are gonna cancel
         if(controllerRef.current) 
            controllerRef.current.abort();
        
        //Update the reference
        controllerRef.current = createAbortController();

        const {request, cancelRequest } = ApiClient(endpoint, {
            method: 'POST',
            data: NewUser,
            signal: controllerRef.current.signal
        })
        
        request.then((res => {
            setFormStatus(oldValue => ({...oldValue, signUp: false}));
            if(res.status === 200)
                showSuccessToast("Sucessfull registered! 👌");
            }
        ))
        .catch((error) => {
            if(error.code === "ERR_NETWORK")
                showErrorToast("No internet connection! 🤯");
            else
                showErrorToast("User already exists! 🤯");
        })
       return cancelRequest;
    }
}

export default SignUp;