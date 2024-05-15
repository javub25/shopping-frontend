import EmailValidator from '../utilities/EmailValidator.jsx';
import axios from 'axios';

const SignUp = (Data, SetSignUp) => 
  {
    const API = import.meta.env.VITE_STRAPI_API_URL;

    const user = {username: Data.get("Name"), email: Data.get("Email"), password: Data.get("Password")};

      const emailStatus = EmailValidator(user.email);

      if(emailStatus)
      {
          axios.post(`${API}/auth/local/register`, user)
            .then((res) => {
              SetSignUp(false)
              console.log(res);
            })
            .catch((error) => {
                alert("This user doesn't exist")
                throw new Error(error);
            });
        }
    }

export default SignUp;