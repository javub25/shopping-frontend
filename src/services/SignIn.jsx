
import { API } from "../utilities/Constants.jsx"
import axios from 'axios';

const SignIn = (Data, setUser) => 
{
    const user = {identifier: Data.get("Email"), password: Data.get("Password")};
 
    if(user.identifier && user.password)
    {
        axios.post(`${API}/auth/local`, user)
        .then((res) => {
            if(res.status === 200)
            {
                alert("Successfull logged in")
                setUser(res.data.user.username);
            }
        })
        .catch((error) => {
            alert("User doesn't exist")
            throw new Error(error);
        });

    }   
}

export default SignIn;