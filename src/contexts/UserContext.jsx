import { createContext, useState } from "react";
import useStoreUser from "../hooks/useStoreUser.jsx";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useStoreUser(user, setUser)
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext, UserProvider}