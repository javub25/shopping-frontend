import axios from 'axios';
import useToastContainer from '@hooks/useToastContainer.jsx';

const SignIn = (Data, setUser) => 
{
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const { showSuccessToast, showErrorToast } = useToastContainer();

    const user = {identifier: Data.get("Email"), password: Data.get("Password")};

    //We check if email and password are enter correctly and then we log in
    if(user.identifier && user.password)
    {
        //We send the email and password to the API to verify if the user exists
        axios.post(`${API}/api/auth/local`, user)
        .then((res) => {
            if(res.status === 200)
            {
                showSuccessToast("Sucessfull logged in! 👌");
                setUser({name: res.data.user.username, email: res.data.user.email});                    
            }
        })
        .catch((error) => {
            if(error.code === "ERR_NETWORK")
                showErrorToast("No internet connection! 🤯")

            else
                showErrorToast("User doesn't exist! 🤯")
            
            throw new Error(error);
        });
    }
}

export default SignIn;