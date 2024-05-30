import axios from 'axios';
import useToastContainer from '@hooks/useToastContainer.jsx';

const SignUp = (Data, setFormStatus, EmailValidator) => 
  {
    const API = import.meta.env.VITE_STRAPI_API_URL;
    const { showSuccessToast, showErrorToast } = useToastContainer();

    //User object will send to Strapi with the respective data from the form
    const user = {username: Data.get("Name"), email: Data.get("Email"), password: Data.get("Password")};

    //We get a boolean that will verify if email format is valid or not
    const emailStatus = EmailValidator(user.email);
    
    //Email must to be valid to register a new user to Strapi
    if(emailStatus && user.password)
    {
        axios.post(`${API}/api/auth/local/register`, user)
            .then((res) => {
                setFormStatus(oldValue => ({...oldValue, signUp: false}));
                if(res.status === 200)
                    showSuccessToast("Sucessfull registered! 👌");
            })
            .catch((error) => {
                if(error.code === "ERR_NETWORK")
                    showErrorToast("No internet connection! 🤯");
                else
                    showErrorToast("User already exists! 🤯");

                throw new Error(error);
            });
        }
    }

export default SignUp;