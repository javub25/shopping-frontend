import { useEffect } from "react";
const useStoreUser = (user, setUser) => 
{
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        return () => {}
    }, []);
    
    // Update user in localStorage when it changes
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        return () => {}
    }, [user]);
}
export default useStoreUser;