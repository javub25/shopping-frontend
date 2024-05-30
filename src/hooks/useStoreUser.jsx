import { useEffect, useState } from "react";

//We keep the user in the local storage every time it changes 
const useStoreUser = (user, setUser) => 
{
// Initialize storedUser state with the value from localStorage
const [storedUser, setStoredUser] = useState(() => {
    const userFromStorage = localStorage.getItem('user');
    return userFromStorage ? JSON.parse(userFromStorage) : { name: 'not logged in', email: 'not logged in'};    
  });

  // Update storedUser when user prop changes
  useEffect(() => {
    const newUser = {
        name: user.name,
        email: user.email
    };
      setStoredUser(newUser);   
      localStorage.setItem('user', JSON.stringify(newUser));
    
      return () => {}
  }, [user]);

  // Update user state the first time component mounts
  useEffect(() => {
    setUser(storedUser);
  }, []);
}

export default useStoreUser;