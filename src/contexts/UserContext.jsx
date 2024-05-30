import { createContext, useState } from "react";
import useStoreUser from "@hooks/useStoreUser.jsx";
const UserContext = createContext();

const UserProvider = ({children}) => {
    //We create an state to handle if the user is logged in or not by default it will be not logged in
    const [user, setUser] = useState({name: 'not logged in', email: 'not logged in'});

    //We pass the user and setUser to the hook
    useStoreUser(user, setUser);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext, UserProvider}